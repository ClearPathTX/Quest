import { google } from 'googleapis';

let auth: any = null;

export async function getGoogleAuth() {
  if (auth) {
    return auth;
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  auth = oauth2Client;
  return auth;
}

export async function getGoogleSheets() {
  const auth = await getGoogleAuth();
  return google.sheets({ version: 'v4', auth });
}

export async function getGoogleDrive() {
  const auth = await getGoogleAuth();
  return google.drive({ version: 'v3', auth });
}
