import { BaseEntity } from 'src/common/entity/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portfolio')
export class PortfolioEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filePath: string;

  @OneToOne(() => UserEntity, (user) => user.portfolio)
  user: UserEntity;
}
