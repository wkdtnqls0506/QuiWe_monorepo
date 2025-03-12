'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import PdfPreview from './PdfPreview';
import { createPortfolio } from '@/apis/portfolio';
import { useRouter } from 'next/navigation';

const FileUpload = () => {
  const router = useRouter();

  const [isDrop, setIsDrop] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDrop(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDrop(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDropOrClick = (event: React.DragEvent<HTMLLabelElement> | React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDrop(false);

    let uploadedFile: File | undefined;
    if ('dataTransfer' in event) {
      uploadedFile = event.dataTransfer.files[0];
    } else if ('target' in event) {
      uploadedFile = event.target.files?.[0];
    }

    if (!uploadedFile) {
      toast.error('파일을 가져오지 못했습니다. 다시 시도해주세요.');
      return;
    }

    if (uploadedFile.type !== 'application/pdf') {
      toast.error('📄 PDF 파일만 업로드해주세요.');
      return;
    }

    setFile(uploadedFile);
    setPdfUrl(URL.createObjectURL(uploadedFile));
  };

  const handleClosePreview = () => {
    setFile(null);
    setPdfUrl(null);
  };

  const handleFetch = async () => {
    try {
      const pdfUploadData = await createPortfolio(file);
      if (!pdfUploadData || !pdfUploadData.quizId) {
        toast.error('업로드한 PDF에서 유효한 텍스트를 추출할 수 없습니다. 다른 파일을 시도해주세요.');
        return;
      }

      router.push(`/challenge/${pdfUploadData.quizId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full max-w-2xl bg-white p-8 rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-center mb-6'>📁 포트폴리오 업로드</h1>
      <p className='text-gray-600 text-center mb-4'>기술 면접 준비를 위한 포트폴리오를 업로드하세요.</p>
      <label
        className={`flex justify-center items-center border-2 border-dashed p-10 rounded-lg transition ${
          isDrop ? 'border-green-500 bg-green-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDropOrClick}
      >
        <input type='file' className='hidden' accept='.pdf' onChange={handleDropOrClick} />
        <p className='text-gray-500'>{file ? `📄 ${file.name}` : '파일을 드래그 및 클릭하여 업로드하세요!'}</p>
      </label>
      {pdfUrl && (
        <div className='flex flex-col w-full items-center'>
          <PdfPreview pdfUrl={pdfUrl} fileName={file?.name} onClose={handleClosePreview} />
          <button
            className='flex justify-center w-3/4 rounded-md py-2 px-40 mt-12 mb-8 bg-green-300 transition-all duration-200 ease-in-out text-white text-lg hover:bg-green-200 whitespace-nowrap'
            onClick={handleFetch}
          >
            퀴즈 풀러가기
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
