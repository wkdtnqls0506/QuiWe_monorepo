type PdfUrlProps = {
  pdfUrl: string | null;
  fileName?: string;
  onClose?: () => void;
};

const PdfPreview = ({ pdfUrl, fileName, onClose }: PdfUrlProps) => {
  if (!pdfUrl) return null;

  return (
    <div className='mt-6 w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-200'>
      <div className='flex justify-between items-center border-b pb-2 mb-3'>
        <h2 className='text-lg font-semibold text-gray-700'>📄 {fileName || '업로드된 파일 미리보기'}</h2>
        {onClose && (
          <button className='text-gray-500 hover:text-red-500 transition' onClick={onClose}>
            ✖
          </button>
        )}
      </div>
      <div className='relative w-full h-80 border border-gray-300 rounded-md overflow-hidden'>
        <iframe src={pdfUrl} className='w-full h-full' title='PDF Preview' />
      </div>
    </div>
  );
};

export default PdfPreview;
