import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json({ message: 'Webhook received' });
}

export async function GET() {
    return NextResponse.json({ message: 'Webhook endpoint active' });
}
