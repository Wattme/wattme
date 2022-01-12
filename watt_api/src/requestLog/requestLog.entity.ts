import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('request_logs')
export class RequestLogEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', length: 1024 })
    public url!: string;

    @Column({ type: 'varchar', length: 10 })
    public method!: string;

    @Column({ type: 'longtext', nullable: true })
    public request?: string;

    @Column({type: 'longtext', nullable: true})
    public response?: string;

    @Column({ type: 'int', nullable: true })
    public code?: number;

    @Column({ type: 'int', name: 'response_time', nullable: true })
    public responseTime?: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt!: Date;
}