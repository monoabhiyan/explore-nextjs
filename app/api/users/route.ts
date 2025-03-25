// app/api/users/route.ts
import {NextResponse} from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://67e212ad97fc65f535348428.mockapi.io/api/v1/userss', {
      headers: {
        'Cache-Control': 'no-cache',
      }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching users:', error);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.message;

      return NextResponse.json(
        {error: message},
        {status, headers: {'Content-Type': 'application/json'}}
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch users',
        message: error instanceof Error ? error.message : String(error)
      },
      {status: 500, headers: {'Content-Type': 'application/json'}}
    );
  }
}
