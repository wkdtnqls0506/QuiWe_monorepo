import { BaseEntity } from 'src/common/entity/base.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => UserEntity, (user) => user.results)
  user: UserEntity;
}
