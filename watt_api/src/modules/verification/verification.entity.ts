import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";

@Entity('verifications')
export class VerificationEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id!: number;

    @ManyToOne(() => UserEntity, user => user.verifications, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    @ApiProperty()
    public user!: UserEntity;

    @Column({ type: "varchar", length: 8, name: 'code' })
    @ApiProperty()
    public code!: string;

    @Column({ type: 'bool', name: 'confirmed', default: false })
    @ApiProperty()
    public confirmed!: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    @ApiProperty()
    public createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    @ApiProperty()
    public updatedAt!: Date;

    public setCode() {
        const code = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < code.length; i++) {
            const randNum = Math.floor(Math.random() * (10 - 0) - 0);
            code[i] = randNum;
        }

        this.code = code.join('');
    }
}