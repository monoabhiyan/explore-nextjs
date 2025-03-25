import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cursor = parseInt(searchParams.get('cursor') || '1');

  const pageSize = 5

  const data = Array(pageSize)
    .fill(0)
    .map((_, i) => {
      return {
        name: 'Project ' + (i + cursor) + ` (server time: ${Date.now()})`,
        id: i + cursor,
      }
    })

  const nextId = cursor < 10 ? data[data.length - 1].id + 1 : null
  const previousId = cursor > -10 ? data[0].id - pageSize : null

  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
  return NextResponse.json({
    data, nextId, previousId
  })
}
