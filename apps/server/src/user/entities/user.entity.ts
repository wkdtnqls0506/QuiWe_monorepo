import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entity/base.entity';
import { PortfolioEntity } from 'src/portfolio/entities/portfolio.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToOne(() => PortfolioEntity)
  @JoinColumn() // 1:1 관계에선 필수
  portfolio: PortfolioEntity;

  @OneToMany(() => QuizEntity, (quiz) => quiz.user)
  quizzes: QuizEntity[];
}
