import { BaseEntity } from 'src/common/entity/base.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { ResultEntity } from 'src/result/entities/result.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('question')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column({ type: 'simple-json', nullable: true })
  options: string[];

  @ManyToOne(() => QuizEntity, (quiz) => quiz.id)
  quiz: QuizEntity; // quizId 생성

  @OneToOne(() => ResultEntity, (result) => result.question)
  result: ResultEntity;
}
