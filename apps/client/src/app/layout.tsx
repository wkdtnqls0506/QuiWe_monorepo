import Header from '@/components/Layout/Header';
import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import QueryProvider from '@/providers/query-provider';
import { AnswerStoreProvider } from '@/providers/userAnswer-store-provider';
import { ResultStoreProvider } from '@/providers/result-store-provider';
import { ExplanationVisibleStoreProvider } from '@/providers/explanationVisible-provider';
import { UserStoreProvider } from '@/providers/user-provider';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/Layout/Footer';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';

export const metadata: Metadata = {
  title: 'QuiWe - GPT 기반 맞춤형 기술 퀴즈 생성 서비스',
  description:
    'QuiWe는 사용자의 이력서, 포트폴리오, 또는 선택한 기술 키워드를 바탕으로 GPT를 활용해 맞춤형 퀴즈를 자동 생성하고 학습할 수 있는 웹 서비스입니다. 단계별 난이도 설정, 문제 풀이 및 해설, 포트폴리오 기반 면접 대비 기능까지 제공합니다.'
};

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${pretendard.variable} font-pretendard`}>
      <body>
        <QueryProvider>
          <UserStoreProvider>
            <Toaster />
            <Header />
            <AnswerStoreProvider>
              <ResultStoreProvider>
                <ExplanationVisibleStoreProvider>
                  <LayoutWrapper>{children}</LayoutWrapper>
                </ExplanationVisibleStoreProvider>
              </ResultStoreProvider>
            </AnswerStoreProvider>
          </UserStoreProvider>
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
