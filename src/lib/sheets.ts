import { google } from "googleapis";

export async function appendLeadToSheet(params: {
  clientEmail: string;
  privateKey: string; // with \n newlines preserved
  spreadsheetId: string;
  sheetName?: string; // default "Leads"
  values: (string | null)[];
}) {
  const jwt = new google.auth.JWT({
    email: params.clientEmail,
    key: params.privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth: jwt });
  const range = `${params.sheetName || "Leads"}!A1`;

  await sheets.spreadsheets.values.append({
    spreadsheetId: params.spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [params.values],
    },
  });
}
