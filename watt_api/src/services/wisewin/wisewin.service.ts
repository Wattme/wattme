import { Injectable } from "@nestjs/common";
import { table } from "console";
import moment from "moment";
import { HttpService } from "nestjs-http-promise";
import { ConfigService } from "src/config/config.service";
import { RequestLogService } from "src/requestLog/requestLog.service";
import { Result } from "src/shared/concrete/Result";
import { ICreateInvoiceData } from "./interfaces/createInvoiceData.interface";
import { ICreateTradeData } from "./interfaces/createTradeData.interface";
import { ICreateUserData, ICreateUserRequest } from "./interfaces/createUserData.interface";
import { IGetCurrentPullData } from "./interfaces/getCurrentPullData.interface";
import { IGetUserByEmailData } from "./interfaces/getUserByEmailData.interface";
import { IGetWattRateData } from "./interfaces/getWattRateData.interface";
import { ISetNewPasswordData } from "./interfaces/setNewPasswordData.interface";
import { IUpdateUserRequest } from "./interfaces/updateUserData.interface";

@Injectable()
export class WisewinService {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
        private requestLogService: RequestLogService
    ) { }

    public async getUserByEmail(email: string): Promise<Result<IGetUserByEmailData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/auth/user-info?email=${email}`);
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url);
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;
            if (!data.success) {
                throw new Error(`Error upon getting user by email ${email}`);
            }

            const getUserByEmailData: IGetUserByEmailData = {
                user: {
                    userId: data.user_id,
                    email: data.email,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    gender: data.gender,
                    packageReferrerPercent: data.package_referrer_percent,
                    packageRewardLimit: data.package_reward_limit,
                    packageSubscriptionExpiredAt: data.package_subscription_expired_at ? new Date(data.package_subscription_expired_at) : undefined,
                    startPackagesLeft: data.start_packages_left,
                    dob: data.dob ? new Date(data.dob) : undefined,
                    tariffTitle: data.tariff_title,
                    updatedAt: new Date(data.user_last_modified_timestamp),
                    avatar: data.avatar,
                    parentId: data.parentId,
                    phone: data.phone,
                    city: data.city,
                    country: data.country,
                    locale: data.locale,
                    parentRefCode: data.parent_refcode,
                    telegramUsername: data.telegram_username
                }
            };

            return Result.ok(getUserByEmailData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex);
        }
    }

    public async createUser(request: ICreateUserRequest): Promise<Result<ICreateUserData | undefined, Error | undefined>> {
        const url = this.makeUrl('/sync-api/streamdesk/registration');
        const body = {
            email: request.email,
            first_name: "",
            last_name: "",
            password: "Kjh0ZW1wX3Bhc3N3b3JkOCo=",
            locale: 'en'
        };

        const log = await this.requestLogService.create('post', url, JSON.stringify(body));
        const before = new Date().getTime();

        try {
            const params = new URLSearchParams();
            params.append('data', JSON.stringify(body));

            const response = await this.httpService.post(url, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            const createUserData: ICreateUserData = {
                userId: data.id
            };

            return Result.ok(createUserData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex);
        }
    }

    public async updateUser(userId: number, request: IUpdateUserRequest): Promise<Result<ICreateUserData | undefined, Error | undefined>> {
        const url = this.makeUrl('/sync-api/streamdesk/update_profile');
        const body: Record<string, any> = {
            first_name: request.firstName,
            last_name: request.lastName,
            country: request.country,
            city: request.city,
            phone: request.phone,
            password: request.password,
            locale: request.locale,
            referrer_parent_code: request.referrerCode,
            birth: request.dob ? moment(request.dob).format('YYYY-MM-DD') : undefined,
            genre: request.gender == 'female' ? '0' : '1',
            avatar: request.picture
        };

        const log = await this.requestLogService.create('post', url, JSON.stringify({...body, userId}));
        const before = new Date().getTime();

        try {
            const params = new URLSearchParams();
            params.append('user_id', String(userId));

            for (const key in body) {
                if (!body[key]) {
                    continue;
                }

                params.append(`data[${key}]`, body[key]);
            }

            const response = await this.httpService.post(url, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data || "{}"));

            const { data } = response;

            const createUserData: ICreateUserData = {
                userId: data.id
            };

            return Result.ok(createUserData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data || "{}"));
            }

            return Result.fail(ex);
        }
    }

    public async setNewPassword(userId: number, password: string): Promise<Result<ISetNewPasswordData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/sync-api/streamdesk/set_password?id=${userId}&password=${password}`);
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url);
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));
            
            const { data } = response;
            const setNewPasswordData: ISetNewPasswordData = {
                success: data.success
            };

            return Result.ok(setNewPasswordData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data || "{}"));
            }

            return Result.fail(ex);
        }
    }

    public async createTrade(): Promise<Result<ICreateTradeData | undefined, Error | undefined>> {
        const url = this.makeUrl('/sync-api/watt/trade');
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url);
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));
            
            const { data } = response;
            const createTradeData: ICreateTradeData = {
                tradeId: data.trade_id
            };

            return Result.ok(createTradeData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data || "{}"));
            }

            return Result.fail(ex);
        }
    }

    public async createInvoice(price: number, tradeId: string, userId: number): Promise<Result<ICreateInvoiceData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/sync-api/watt/invoice?price=${price}&trade_id=${tradeId}&user_id=${userId}`);
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url);
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));
            
            const { data } = response;
            const createInvoiceData: ICreateInvoiceData = {
                gasLimit: data.gas_limit,
                gasPrice: data.gas_price,
                hash: data.hash,
                price: data.price,
                sign: data.sign,
                tradeId: data.trade_id
            };

            return Result.ok(createInvoiceData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data || "{}"));
            }

            return Result.fail(ex);
        }
    }

    public async getCurrentPull(): Promise<Result<IGetCurrentPullData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/sync-api/streamdesk/get_current_pool`);
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url);
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));
            
            const { data } = response;

            const getCurrentPullData: IGetCurrentPullData = {
                currentSale: Number(data.current_sale),
                maxSale: Number(data.max_sale),
                name: data.name
            };

            return Result.ok(getCurrentPullData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data || "{}"));
            }

            return Result.fail(ex);
        }
    }

    public async getWattRate(): Promise<Result<IGetWattRateData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/sync-api/streamdesk/get_watt_rate`);
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url);
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));
            
            const { data } = response;

            const getWattRateData: IGetWattRateData = {
                rate: Number.parseFloat(data)
            };

            return Result.ok(getWattRateData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data || "{}"));
            }

            return Result.fail(ex);
        }
    }

    private makeUrl(url: string): string {
        return `${this.configService.props.wisewin.url}${url}`;
    }
}