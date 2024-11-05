import { getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // Allow public routes
    if (request.nextUrl.pathname === '/') {
        return NextResponse.next();
    }

    const session = await getSession();

    // Redirect to home if not logged in
    if (!session?.user) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
