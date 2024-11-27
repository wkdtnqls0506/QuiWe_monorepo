import { BaseEntity } from 'src/common/entity/base.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
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

  @ManyToOne(() => UserEntity, (user) => user.quizzes)
  user: UserEntity;

  @OneToMany(() => QuestionEntity, (question) => question.quiz, {
    cascade: true,
  })
  questions: QuestionEntity[];
}
