import { BaseEntity } from 'src/common/entity/base.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
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
  userAnswer: string;

  @Column()
  isCorrect: boolean;

  @Column()
  description: string;

  @Column()
  correctAnswer: string;

  @OneToOne(() => QuestionEntity, (question) => question.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  question: QuestionEntity; // questionId 생성
}
