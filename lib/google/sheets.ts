import { sheets, SHEET_ID } from "./auth"

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
