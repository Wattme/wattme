import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VerificationEntity } from "../verification/verification.entity";
import bcrypt from 'bcrypt';
import { RestorationEntity } from "../restoration/restoration.entity";
import { KeysEntity } from "../trading/keys.entity";
import { userLocation, UserLocation } from "../../static/userLocation";
import { UserGender } from "../../static/userGender";
import { ExchangeOrderEntity } from "../exchange/exchangeOrder.entity";
import { userRole, UserRole } from "../../static/userRole";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id!: number;

    @Column({ type: 'varchar', length: 45, name: 'email', unique: true })
    @ApiProperty()
    public email!: string;

    @Column({ type: 'varchar', length: 15, name: 'phone', nullable: true })
    @ApiProperty()
    public phone?: string;

    @Column({ type: 'varchar', length: 256, name: 'telegram_username', nullable: true })
    @ApiProperty()
    public telegramUsername?: string;

    @Column({ type: 'varchar', length: 45, name: 'first_name', nullable: true })
    @ApiProperty()
    public firstName?: string;

    @Column({ type: 'varchar', length: 45, name: 'last_name', nullable: true })
    @ApiProperty()
    public lastName?: string;

    @Column({ type: 'varchar', length: 45, name: 'country', nullable: true })
    @ApiProperty()
    public country?: string;

    @Column({ type: 'varchar', length: 45, name: 'city', nullable: true })
    @ApiProperty()
    public city?: string;

    @Column({ type: 'varchar', length: 15, name: 'wisewin_patron_code', nullable: true })
    @ApiProperty()
    public wisewinPatronCode?: string;

    @Column({ type: 'int', name: 'wisewin_id', nullable: true })
    @ApiProperty()
    public wisewinId?: number;

    @Column({ type: 'varchar', length: 1024, name: 'password' })
    @ApiProperty()
    public password!: string;

    @Column({ type: 'bool', name: 'verified', default: false })
    @ApiProperty()
    public verified!: boolean;

    @Column({ type: 'bool', name: 'full', default: false })
    @ApiProperty()
    public full!: boolean;

    @Column({ type: 'bool', name: 'binance', default: false })
    @ApiProperty()
    public binance!: boolean;

    @Column({ name: 'dob', type: 'timestamp', nullable: true })
    @ApiProperty()
    public dob?: Date;

    @Column({ name: 'gender', type: 'varchar', length: '6', nullable: true })
    @ApiProperty()
    public gender?: UserGender;

    @Column({ name: 'picture', type: 'varchar', length: '256', nullable: true })
    @ApiProperty()
    public picture?: string;

    @Column({ name: 'location', type: 'varchar', length: '4', nullable: true, default: userLocation.getList()[0] })
    @ApiProperty()
    public location!: UserLocation;

    @Column({ name: 'role', type: 'varchar', length: 15, default: userRole.default() })
    public role!: UserRole

    @OneToMany(() => VerificationEntity, verification => verification.user)
    @ApiProperty()
    public verifications!: VerificationEntity[];

    @OneToMany(() => RestorationEntity, restoration => restoration.user)
    @ApiProperty()
    public restorations!: VerificationEntity[];

    @OneToMany(() => KeysEntity, keys => keys.user)
    @ApiProperty()
    public keys!: KeysEntity[];

    @OneToMany(() => ExchangeOrderEntity, exchangeOrder => exchangeOrder.user)
    @ApiProperty()
    public exchangeOrders!: ExchangeOrderEntity[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    @ApiProperty()
    public createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    @ApiProperty()
    public updatedAt!: Date;

    public async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    public async comparePassword(password: string): Promise<boolean> {
        const passwordsMatched = await bcrypt.compare(password, this.password);
        return passwordsMatched;
    }

    public sanitize(): UserEntity {
        delete (<any>this).password;
        delete (<any>this).binancePublicKey;
        delete (<any>this).binanceSecretKey;

        return this;
    }

    public isFull(): boolean {
        if (
            this.city &&
            this.country &&
            this.email &&
            this.phone &&
            this.wisewinPatronCode &&
            this.firstName &&
            this.lastName &&
            this.dob &&
            this.gender &&
            this.location
        ) {
            return true;
        }

        return false;
    }
}