import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Apps Script Web App URL
    const appsScriptUrl = 'https://script.google.com/a/macros/clearpathtx.com/s/AKfycbxg4BsPj7rN4g65vhSzbqH3lAhT9G5iG9JaZCZzS8xuJ941sLa9ZWZTtd1FhqkV-s0kVg/exec';

    // Forward the data to Google Apps Script
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      redirect: 'follow',
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Apps Script error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save data to Google Sheets' },
        { status: 500 }
      );
    }

    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save data' },
      { status: 500 }
    );
  }
}
