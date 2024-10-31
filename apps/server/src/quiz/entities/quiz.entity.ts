import { QuestionEntity } from 'src/question/question.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class QuizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  category: string;

  @Column('int')
  level: number;

  @Column('varchar[]')
  tags: string[];

  @CreateDateColumn('timestamp')
  createdAt: Date;

  @UpdateDateColumn('timestamp')
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.quizzes)
  user: UserEntity;

  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  questions: QuestionEntity[];
}
