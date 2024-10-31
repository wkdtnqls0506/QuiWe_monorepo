import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PortfolioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bytea')
  filePath: string;

  @Column('text')
  description: string;

  @CreateDateColumn('timestamp')
  createdAt: Date;

  @UpdateDateColumn('timestamp')
  updatedAt: Date;
}
