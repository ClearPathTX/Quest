import { NextRequest, NextResponse } from 'next/server';
import { getGoogleSheets, getGoogleDrive } from '@/lib/googleAuth';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Get Google Sheets API
    const sheets = await getGoogleSheets();
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!sheetId) {
      throw new Error('GOOGLE_SHEET_ID not configured');
    }

    // Handle insurance card image upload if present
    let imageUrl = '';
    if (data.insuranceCardImage) {
      try {
        const drive = await getGoogleDrive();
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

        // Extract base64 data
        const base64Data = data.insuranceCardImage.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');

        // Upload to Google Drive
        const fileMetadata = {
          name: `insurance_${data.fullName}_${Date.now()}.jpg`,
          parents: folderId ? [folderId] : [],
        };

        const media = {
          mimeType: 'image/jpeg',
          body: buffer,
        };

        const file = await drive.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: 'id,webViewLink',
        } as any);

        imageUrl = file.data.webViewLink || '';
      } catch (error) {
        console.error('Error uploading image:', error);
        // Continue without image if upload fails
      }
    }

    // Prepare row data for Google Sheets
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      data.fullName || '',
      data.phone || '',
      data.email || '',
      data.dateOfBirth || '',
      data.seekingHelpFor || '',
      data.primaryIssue || '',
      data.duration || '',
      data.frequency || '',
      data.withdrawal || '',
      data.previousTreatment || '',
      data.environment || '',
      Array.isArray(data.mentalHealth) ? data.mentalHealth.join(', ') : '',
      data.insuranceType || '',
      data.insuranceProvider || '',
      imageUrl,
      data.insuranceReceivedHow || '',
      data.recoveryReadiness?.toString() || '',
      data.urgency || '',
      data.consentToContact ? 'Yes' : 'No',
    ];

    // Append to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'leads!A:T',
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Assessment submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: 'Failed to submit assessment', error: errorMessage },
      { status: 500 }
    );
  }
}
