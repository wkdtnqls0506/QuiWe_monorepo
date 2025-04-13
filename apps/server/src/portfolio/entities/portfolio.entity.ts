import { BaseEntity } from 'src/common/entity/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portfolio')
export class PortfolioEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  filePath: string;

  @ManyToOne(() => UserEntity, (user) => user.portfolios, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
