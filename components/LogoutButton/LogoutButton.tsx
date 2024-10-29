'use client';

export function LogoutButton() {
    return (
        <a href="/api/auth/logout" className="logout-button">
            Log Out
        </a>
    );
}
