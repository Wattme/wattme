import { UserRole } from "src/static/userRole";

export interface IPayload {
    userId: number;
    role: UserRole;
};