// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {getServerSession} from "next-auth";
import {NextResponse} from 'next/server'
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    session
  });
}
