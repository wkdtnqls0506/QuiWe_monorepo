import { PortfolioEntity } from 'src/portfolio/entity/portfolio.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() // auto increment PK
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @CreateDateColumn('timestamp')
  createdAt: Date;

  @UpdateDateColumn('timestamp')
  updatedAt: Date;

  @OneToOne(() => PortfolioEntity)
  @JoinColumn() // 1:1 관계에선 필수
  portfolio: PortfolioEntity;

  @OneToMany(() => QuizEntity, (quiz) => quiz.user)
  quizzes: QuizEntity[];
}
