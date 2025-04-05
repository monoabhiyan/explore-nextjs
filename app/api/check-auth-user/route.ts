// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {getServerSession} from "next-auth";
import {NextResponse} from 'next/server'
import {authOptions} from "@/lib/nextAuth";

export async function GET() {
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    session
  });
}
