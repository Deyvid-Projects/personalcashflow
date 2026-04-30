import { google } from "googleapis"

const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SA_KEY_BASE64!, "base64").toString("utf-8")
)

export const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
    ],
})

export const sheets = google.sheets({ version: "v4", auth })
export const drive = google.drive({ version: "v3", auth })

export const SHEET_ID = process.env.SHEET_ID!
export const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID!

export async function readRange(range: string): Promise<string[][]> {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range,
    })
    return (res.data.values ?? []) as string[][]
}

export async function readSheet(tabName: string): Promise<string[][]> {
    return readRange(`${tabName}!A:Z`)
}