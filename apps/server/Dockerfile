# Node.js 21.x + Alpine
FROM node:21-alpine

# bcrypt native 빌드에 필요한 패키지 설치
RUN apk --no-cache add --virtual builds-deps build-base python3

# 애플리케이션 디렉토리 생성
WORKDIR /app

# package.json 복사
COPY ./apps/server/package.json ./

# pnpm 설치 및 의존성 설치
RUN npm install -g pnpm
RUN pnpm install 

# 앱 소스 복사
COPY ./apps/server ./

# NestJS 빌드
RUN pnpm run build

EXPOSE 4000
CMD ["pnpm", "run", "start:prod"]