import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  answer: string;

  @Column('boolean')
  result: boolean;

  @Column('text')
  description: string;

  @Column('text')
  correctAnswer: string;

  @OneToOne(() => QuizEntity)
  @JoinColumn()
  quiz: QuizEntity;
}
