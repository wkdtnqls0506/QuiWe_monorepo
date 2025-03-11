'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const PortfolioPage = () => {
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

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDrop(false);

    const uploadedFile = event.dataTransfer.files[0];
    if (!uploadedFile) {
      toast.error('파일을 가져오지 못했습니다. 다시 시도해주세요.');
      return;
    }

    if (uploadedFile.type !== 'application/pdf') {
      toast.error('📄 PDF 파일만 업로드해주세요.');
      return;
    }

    setFile(uploadedFile);

    const blobUrl = URL.createObjectURL(uploadedFile);
    setPdfUrl(blobUrl);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      toast.error('📄 PDF 파일만 업로드해주세요.');
      return;
    }

    setFile(selectedFile);

    const blobUrl = URL.createObjectURL(selectedFile);
    setPdfUrl(blobUrl);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <div className='w-3/4 max-w-2xl p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-center mb-6'>📁 포트폴리오 업로드</h1>
        <p className='g-red-400text-gray-600 text-center mb-4'>기술 면접 준비를 위한 포트폴리오를 업로드하세요.</p>
        <label
          className={`flex justify-center items-center border-2 border-dashed p-10 rounded-lg transition ${
            isDrop ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          htmlFor=''
        >
          <input type='file' className='hidden' accept='.pdf' />
          <p className='text-gray-500'>{file ? `📄 ${file.name}` : '파일을 드래그하여 업로드'}</p>
        </label>

        <div className='mt-4 flex justify-center'>
          <label className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition'>
            파일 선택
            <input type='file' className='hidden' accept='.pdf' onChange={handleFileSelect} />
          </label>
        </div>
      </div>
      {pdfUrl && (
        <div className='mt-6 text-center'>
          <h2 className='text-lg font-semibold mb-2'>📄 업로드된 파일 미리보기</h2>
          <iframe src={pdfUrl} className='w-full h-80 border rounded-lg' title='PDF Preview' />
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
