# Node.js 21.x + Alpine
FROM node:21-alpine

# bcrypt native 빌드에 필요한 패키지 설치
RUN apk --no-cache add --virtual builds-deps build-base python3

# 애플리케이션 디렉토리 생성
WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# package.json 복사
COPY ./apps/server/package.json ./

# pnpm 의존성 설치
RUN pnpm install --unsafe-perm

# 앱 소스 복사
COPY ./apps/server ./

# bcrypt 재빌드
RUN npm rebuild bcrypt --build-from-source

# NestJS 빌드
RUN pnpm run build

EXPOSE 4000
CMD ["pnpm", "run", "start:prod"]