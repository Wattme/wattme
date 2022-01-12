export type UserGender = 'male' | 'female';

export type UserTariffTitle = 'basic' | 'default' | 'optimal' | 'block' | 'premium' | 'unlimited' | 'VIP' | '';

export type UserLocale = 'en' | 'ru';

export type User = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob?: Date;
    gender: UserGender;
    avatar: string;
    updatedAt: Date;
    packageSubscriptionExpiredAt?: Date;
    packageReferrerPercent: number;
    packageRewardLimit: number;
    tariffTitle: UserTariffTitle;
    parentId?: number;
    startPackagesLeft: number;
    country: string;
    city: string;
    telegramUsername?: string;
    parentRefCode?: string;
    locale: UserLocale; 
};