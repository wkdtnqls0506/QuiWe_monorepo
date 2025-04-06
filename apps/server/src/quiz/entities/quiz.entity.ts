import { BaseEntity } from 'src/common/entity/base.entity';
import { QuizStatus } from 'src/quiz/enums/quiz-status.enum';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { ResultEntity } from 'src/result/entities/result.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('quiz')
export class QuizEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  level: number;

  @Column()
  details: string;

  @Column({ type: 'enum', enum: QuizStatus, default: QuizStatus.PENDING })
  status: QuizStatus;

  @ManyToOne(() => UserEntity, (user) => user.quizzes)
  user: UserEntity;

  @OneToMany(() => QuestionEntity, (question) => question.quiz, {
    cascade: true,
  })
  questions: QuestionEntity[];

  @OneToMany(() => ResultEntity, (result) => result.quiz)
  results: ResultEntity[];
}
