import { config } from 'dotenv';
import { PortfolioEntity } from 'src/portfolio/entities/portfolio.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { ResultEntity } from 'src/result/entities/result.entity';
import { UserEntity } from 'src/user/entities/user.entity';

config({ path: __dirname + '/.env' });

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'QuiWe_DB',
  // entities: [__dirname + '../**/entities/*.entity{.ts,.js}'],
  entities: [
    QuizEntity,
    QuestionEntity,
    UserEntity,
    ResultEntity,
    PortfolioEntity,
  ],
  migrataions: [__dirname + 'database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: true,
};
