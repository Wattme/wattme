import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { KeysEntity } from "./keys.entity";

@Entity('order_records')
export class OrderRecordEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id!: number;

    @Column({ type: 'int', name: 'keys_id' })
    @ApiProperty()
    public keysId!: number;

    @ManyToOne(() => KeysEntity, keys => keys.ordersRecords, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'keys_id' })
    @ApiProperty()
    public keys!: KeysEntity;

    @Column({ type: 'varchar', length: '16', name: 'symbol' })
    @ApiProperty()
    public symbol!: string;

    @Column({ type: 'varchar', length: '8', name: 'baseAsset' })
    @ApiProperty()
    public baseAsset!: string;

    @Column({ type: 'varchar', length: '8', name: 'quoteAsset' })
    @ApiProperty()
    public quoteAsset!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    @ApiProperty()
    public createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    @ApiProperty()
    public updatedAt!: Date;
}