import { BaseEntity } from 'src/common/entity/base.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('question')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  options: string;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.id)
  quiz: QuizEntity; // quizId 생성
}
