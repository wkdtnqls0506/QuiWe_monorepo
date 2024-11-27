import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portfolio')
export class PortfolioEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filePath: string;

  @Column()
  description: string;
}
