import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { OrderRecordEntity } from "./orderRecord.entity";

@Entity('keys')
export class KeysEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id!: number;

    @Column({ type: 'varchar', length: 45, name: 'name' })
    @ApiProperty()
    public name!: string;

    @Column({ type: 'varchar', length: 1024, name: 'public' })
    @ApiProperty()
    public public!: string;

    @Column({ type: 'varchar', length: 1024, name: 'secret' })
    @ApiProperty()
    public secret!: string;

    @Column({ type: 'bool', default: false, name: 'default' })
    @ApiProperty()
    public default!: boolean;

    @Column({ name: 'user_id' })
    @ApiProperty()
    public userId!: number;

    @ManyToOne(() => UserEntity, user => user.keys, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    @ApiProperty()
    public user!: UserEntity;

    @OneToMany(() => OrderRecordEntity, orderRecord => orderRecord.keys)
    @ApiProperty()
    public ordersRecords!: OrderRecordEntity[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    @ApiProperty()
    public createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    @ApiProperty()
    public updatedAt!: Date;

    public sanitize(): KeysEntity {
        delete (<any>this).secret;
        delete (<any>this).public;
        delete (<any>this).user;

        return this;
    }
}