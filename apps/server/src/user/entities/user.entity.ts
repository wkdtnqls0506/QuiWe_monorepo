import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entity/base.entity';
import { PortfolioEntity } from 'src/portfolio/entities/portfolio.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { ResultEntity } from 'src/result/entities/result.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  profileImage: string;

  @Column()
  @Exclude()
  refreshToken: string;

  @Column()
  @Exclude()
  kakaoAccessToken: string;

  @Column()
  @Exclude()
  kakaoRefreshToken: string;

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.user)
  portfolios: PortfolioEntity[];

  @OneToMany(() => QuizEntity, (quiz) => quiz.user)
  quizzes: QuizEntity[];

  @OneToMany(() => ResultEntity, (result) => result.user)
  results: ResultEntity[];
}
