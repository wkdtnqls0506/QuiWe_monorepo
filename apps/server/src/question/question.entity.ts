import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  type: string;

  @Column('text')
  title: string;

  @Column('text[]')
  options: string[];

  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions)
  quiz: QuizEntity;
}
