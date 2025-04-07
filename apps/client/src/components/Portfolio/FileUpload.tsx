'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import PdfPreview from './PdfPreview';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useCreatePortfolio } from '@/hooks/useCreatePortfolio';
import CustomLoading from '../Layout/CustomLoading';
import { CREATE_QUIZ_MESSAGES } from '@/constants/loadingMessage';

const FileUpload = () => {
  const [isDrop, setIsDrop] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const { mutate, isPending } = useCreatePortfolio();

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

  return (
    <div className='w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg border border-gray-200'>
      <label
        className={`flex flex-col justify-center items-center border-2 border-dashed p-12 rounded-lg cursor-pointer transition ${
          isDrop ? 'border-green-500 bg-green-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDropOrClick}
      >
        <input type='file' className='hidden' accept='.pdf' onChange={handleDropOrClick} />
        <FaCloudUploadAlt className='text-5xl text-gray-400 mb-3' />
        <p className='text-gray-500 text-lg'>{file ? `📄 ${file.name}` : '파일을 여기에 드래그 또는 클릭하세요'}</p>
      </label>
      {pdfUrl && (
        <div className='flex flex-col w-full items-center mt-8'>
          <PdfPreview pdfUrl={pdfUrl} fileName={file?.name} onClose={handleClosePreview} />
          <button
            className='w-full py-3 mt-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-400 transition-all'
            onClick={() => {
              mutate(file);
            }}
          >
            {isPending ? <CustomLoading messages={CREATE_QUIZ_MESSAGES} /> : '제출하고 퀴즈 풀러가기'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
