export interface User {
    email: string;
    name: string;
    isAdmin: boolean;
    currentPassword?: string;
    newPassword?: string;
    exp: Date | string | null;
}
