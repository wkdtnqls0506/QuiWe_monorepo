import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    // API가 종료되는 시점에 어떤 API가 호출되었는지 메서드, 주소, 응답 상태값, 소요된 시간을 로깅

    const { method, originalUrl } = req;
    const startTime = Date.now(); // API 시작 시점에 시작 시간을 기록

    // 1. API가 완료되는 시점에 동작
    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime; // API 종료 시점에 현재 시간과 시작 시간을 비교하여 소요된 시간을 계산

      this.logger.log(
        `[${method}] : ${originalUrl} ${statusCode} ${responseTime}ms`,
      );
    });
    next();
  }
}
