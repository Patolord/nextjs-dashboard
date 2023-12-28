import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { Readable } from 'stream'; // Import the 'Readable' type

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
        throw new Error('Filename is missing.'); // Handle the case where 'filename' is null
    }

    const blob = await put(filename, request.body as unknown as Readable, { // Cast 'request.body' as 'unknown' before casting it as 'Readable'
        access: 'public',
    });

    return NextResponse.json(blob);
}

