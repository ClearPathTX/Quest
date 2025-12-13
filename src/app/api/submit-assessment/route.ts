import { NextRequest, NextResponse } from 'next/server';

async function getAccessToken(): Promise<string> {
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    throw new Error('Google OAuth credentials not configured');
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function uploadImageToDrive(base64Image: string, fileName: string, accessToken: string, folderId: string) {
  try {
    // Convert base64 to blob
    const base64Data = base64Image.split(',')[1];
    const binaryData = Buffer.from(base64Data, 'base64');

    // Create file metadata
    const metadata = {
      name: fileName,
      parents: [folderId],
      mimeType: 'image/jpeg',
    };

    // Upload to Google Drive using multipart upload
    const boundary = '===============7330845974216740156==';
    const metadataStr = JSON.stringify(metadata);

    // Build multipart body as a Buffer
    const part1 = Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadataStr}\r\n--${boundary}\r\nContent-Type: image/jpeg\r\n\r\n`);
    const part2 = Buffer.from('\r\n--' + boundary + '--');
    const body = Buffer.concat([part1, binaryData, part2]);

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary="${boundary}"`,
      },
      body: body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Drive upload error:', errorText);
      throw new Error(`Upload failed: ${errorText}`);
    }

    const fileData = await response.json();
    const fileId = fileData.id;

    // Make file publicly accessible and get the shareable link
    await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'reader',
        type: 'anyone',
      }),
    });

    // Return the shareable link
    return `https://drive.google.com/uc?id=${fileId}&export=view`;
  } catch (error) {
    console.error('Error uploading image to Drive:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const driveFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!spreadsheetId || !driveFolderId) {
      return NextResponse.json(
        { success: false, error: 'Google configuration not complete - missing SHEET_ID or DRIVE_FOLDER_ID' },
        { status: 500 }
      );
    }

    let accessToken: string;
    try {
      accessToken = await getAccessToken();
    } catch (tokenError) {
      console.error('Token error:', tokenError);
      return NextResponse.json(
        { success: false, error: `OAuth error: ${tokenError}` },
        { status: 500 }
      );
    }

    // Upload insurance card image if provided
    let insuranceCardLink = '';
    if (data.insuranceCardImage && driveFolderId) {
      const timestamp = new Date().getTime();
      const fileName = `insurance-card-${data.email || 'unknown'}-${timestamp}.jpg`;
      const link = await uploadImageToDrive(data.insuranceCardImage, fileName, accessToken, driveFolderId);
      insuranceCardLink = link || '';
    }

    // Prepare the row of data - must have exactly 20 columns to match headers
    const row = [
      new Date().toISOString(), // A: Timestamp
      data.seekingHelpFor || '', // B: Seeking Help For
      data.primaryIssue || '', // C: Primary Issue
      data.duration || '', // D: Duration
      data.frequency || '', // E: Frequency
      data.withdrawal || '', // F: Safety Concerns
      data.previousTreatment || '', // G: Previous Treatment
      data.environment || '', // H: Environment
      Array.isArray(data.mentalHealth) ? data.mentalHealth.join(', ') : '', // I: Additional Concerns
      data.insuranceType || '', // J: Insurance Type
      data.insuranceProvider || '', // K: Insurance Provider
      insuranceCardLink || 'No image', // L: Insurance Card Image
      data.insuranceReceivedHow || '', // M: How Insurance Received
      data.recoveryReadiness || '', // N: Treatment Readiness (0-10)
      data.dateOfBirth || '', // O: Date of Birth
      data.urgency || '', // P: Urgency
      data.fullName || '', // Q: Full Name
      data.phone || '', // R: Phone
      data.email || '', // S: Email
      data.consentToContact ? 'Yes' : 'No', // T: Consent to Contact
    ];

    const values = [row];

    // Append to Google Sheet using REST API
    const range = encodeURIComponent('leads!A:T');
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Google Sheets API error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save data to Google Sheets' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Data saved to Google Sheets' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save data' },
      { status: 500 }
    );
  }
}
