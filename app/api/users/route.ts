import {NextResponse} from 'next/server'

export async function GET() {
  const blob = await fetch('https://67e212ad97fc65f535348428.mockapi.io/api/v1/users', {
    cache: 'no-cache',
  });
  const users = await blob.json();
  return NextResponse.json(users);
}
