# Node.js 21.x 버전 사용
FROM node:21-alpine

# 애플리케이션 디렉토리 생성
WORKDIR /app

# package.json 파일 복사
COPY package.json ./

# pnpm 설치 및 의존성 설치
RUN npm install -g pnpm
RUN pnpm install

# 애플리케이션 소스 복사
COPY . .

# NestJS 빌드
RUN pnpm run build

# 애플리케이션 실행
EXPOSE 3000
CMD ["pnpm", "run", "start:prod"]
