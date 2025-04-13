export type TPortfolio = {
  fileURL: string;
  quizId: number;
};

export type TPortfolioResponse = {
  id: number;
  filePath: string;
  fileName: string;
  signedUrl: string;
  createdAt: string;
};
