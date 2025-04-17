# Node.js 21.x 버전 사용
# FROM node:21-alpine
FROM node:21-slim

RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

# 애플리케이션 디렉토리 생성
WORKDIR /app

# package.json 파일 복사
COPY ./apps/server/package.json ./  

# pnpm 설치 및 의존성 설치
RUN npm install -g pnpm
RUN pnpm install --unsafe-perm

# 애플리케이션 소스 복사
COPY ./apps/server ./

# NestJS 빌드
RUN pnpm run build

# 애플리케이션 실행
EXPOSE 4000
CMD ["pnpm", "run", "start:prod"]