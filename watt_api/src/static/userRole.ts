import Static from "./Static"

export type UserRole = 'common' | 'admin'

export const userRole = new Static('common', 'admin');