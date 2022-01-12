import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Platform {
    IOS = 'ios',
    ANDROID = 'android'  
};

@Entity('client_logs')
export class ClientLogEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id!: number;

    @Column({type: 'int', name: 'user_id'})
    @ApiProperty()
    public userID!: number;

    @Column({type: 'varchar', length: '256', name: 'title', nullable: true})
    @ApiProperty()
    public title?: string;

    @Column({type: 'varchar', length: '256', name: 'method', nullable: true})
    @ApiProperty()
    public method?: string;

    @Column({type: 'mediumtext', name: 'message', nullable: true})
    @ApiProperty()
    public message?: string;

    @Column({type: 'bool', name: 'error', default: false})
    @ApiProperty()
    public error!: boolean;

    @Column({type: 'varchar', length: '32', name: 'coin_code', nullable: true})
    @ApiProperty()
    public coinCode?: string;

    @Column({type: 'varchar', length: '256', name: 'coin_address', nullable: true})
    @ApiProperty()
    public coinAddress?: string;

    @Column({type: 'enum', enum: Platform, nullable: true})
    @ApiProperty()
    public platform?: Platform;

    @Column({type: 'varchar', length: '32', name: 'app_version', nullable: true})
    @ApiProperty()
    public appVersion?: string;

    @Column({type: 'mediumtext', name: 'device_info', nullable: true})
    @ApiProperty()
    public deviceInfo?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    @ApiProperty()
    public createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @ApiProperty()
    public updatedAt!: Date;
}