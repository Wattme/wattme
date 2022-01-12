import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExchangeOrderEntity } from "./exchangeOrder.entity";

@Entity({ name: 'exchange_fills' })
export class ExchangeFillEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ name: 'id' })
    public id!: number;

    @Column({ name: 'buy_order_id', type: 'int' })
    @ApiProperty()
    public buyOrderId!: number;

    @ManyToOne(() => ExchangeOrderEntity, exchangeOrder => exchangeOrder.buyFills, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'buy_order_id' })
    @ApiProperty()
    public buyOrder!: ExchangeOrderEntity;

    @Column({ name: 'sell_order_id', type: 'int' })
    @ApiProperty()
    public sellOrderId!: number;

    @ManyToOne(() => ExchangeOrderEntity, exchangeOrder => exchangeOrder.sellFills, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'sell_order_id' })
    @ApiProperty()
    public sellOrder!: ExchangeOrderEntity;

    @Column({ name: 'value', type: 'decimal', precision: 20, scale: 8 })
    @ApiProperty()
    public value!: number;

    @Column({ name: 'seller_hash', type: 'varchar', length: 256, nullable: true })
    @ApiProperty()
    public sellerHash?: string;

    @Column({ name: 'buyer_hash', type: 'varchar', length: 256, nullable: true })
    @ApiProperty()
    public buyerHash?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    @ApiProperty()
    public createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    @ApiProperty()
    public updatedAt!: Date;
}