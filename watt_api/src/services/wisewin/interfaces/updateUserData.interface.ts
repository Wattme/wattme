import { UserGender } from "./user.type";

export interface IUpdateUserRequest {
    firstName?: string;
    lastName?: string;
    locale?: string;
    phone?: string;
    telegramId?: string;
    country?: string;
    city?: string;
    referrerCode?: string;
    password?: string;
    dob?: Date;
    gender?: UserGender;
    picture?: string;
};

export interface IUpdateUserData {
    success: boolean;
};