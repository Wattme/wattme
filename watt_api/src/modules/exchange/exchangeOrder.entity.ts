import { ApiProperty } from "@nestjs/swagger";
import { ExchangeOrderSide } from "src/static/exchangeOrderSide";
import { ExchangeOrderSymbol } from "src/static/exchangeOrderSymbol";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { ExchangeFillEntity } from "./exchangeFill.entity";
// import { ExchangeFillEntity } from "./exchangeFill.entity";

@Entity({ name: 'exchange_orders' })
export class ExchangeOrderEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    @ApiProperty()
    public id!: number;

    @Column({ name: 'system_address', type: 'varchar', length: 45 })
    @ApiProperty()
    public systemAddress!: string;

    @Column({ name: 'address', type: 'varchar', length: 45 })
    @ApiProperty()
    public address!: string;

    @Column({ name: 'value', type: 'decimal', precision: 20, scale: 8 })
    @ApiProperty()
    public value!: number;

    @Column({ name: 'side', type: 'varchar', length: 4 })
    @ApiProperty()
    public side!: ExchangeOrderSide;

    @Column({ name: 'price', type: 'decimal' })
    @ApiProperty()
    public price!: number;

    @Column({ name: 'symbol', type: 'varchar', length: 45 })
    @ApiProperty()
    public symbol!: ExchangeOrderSymbol;

    @Column({ name: 'hash', type: 'varchar', length: 256, nullable: true })
    @ApiProperty()
    public hash?: string;

    @Column({ name: 'confirmed', type: 'bool', default: false})
    @ApiProperty()
    public confirmed!: boolean;

    @Column({ name: 'complete', type: 'bool', default: false})
    @ApiProperty()
    public complete!: boolean;

    @OneToMany(() => ExchangeFillEntity, exchangeFill => exchangeFill.sellOrder, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @ApiProperty()
    public sellFills!: ExchangeFillEntity[];

    @OneToMany(() => ExchangeFillEntity, exchangeFill => exchangeFill.buyOrder, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @ApiProperty()
    public buyFills!: ExchangeFillEntity[];

    @Column({ name: 'user_id' })
    @ApiProperty()
    public userId!: number;

    @ManyToOne(() => UserEntity, user => user.exchangeOrders, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    public user!: UserEntity;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    @ApiProperty()
    public createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    @ApiProperty()
    public updatedAt!: Date;
}