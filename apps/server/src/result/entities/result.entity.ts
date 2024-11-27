import { BaseEntity } from 'src/common/entity/base.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('result')
export class ResultEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  result: boolean;

  @Column()
  description: string;

  @Column()
  correctAnswer: string;

  @OneToOne(() => QuizEntity)
  @JoinColumn()
  quiz: QuizEntity;
}
