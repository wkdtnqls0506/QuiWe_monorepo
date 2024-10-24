import { useState, DragEvent } from 'react'
import { PiUploadBold } from 'react-icons/pi'
import toast from 'react-hot-toast'

const UploadFile = () => {
  const [isActive, setActive] = useState(false)
  //   const [fileName, setFileName] = useRecoilState(fileState)

  const handleDragEnter = () => setActive(true)

  const handleDragLeave = () => setActive(false)

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file?.type !== 'application/pdf') {
      toast.error('pdf 형식의 파일만 업로드해주세요.')
    } else {
      //   setFileName(file.name)
      setActive(false)
    }
  }

  return (
    <label
      className={`px-40 flex flex-col justify-center items-center border-dashed border-4 border-green-100 h-[400px] mt-8 rounded-lg cursor-pointer transition-all duration-200 ease-in-out 
      ${isActive ? 'bg-gray-200 border-gray-900' : 'border-green-100'} hover:border-green-200`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input type="file" accept=".pdf" className="hidden" />
      {/* {!fileName ?  */}
      <>
        <PiUploadBold className="w-24 h-24 text-gray-500" />
        <p className="text-gray-800 font-medium text-lg mt-5">
          파일을 이곳에 업로드해주세요. (pdf 형식만 가능)
        </p>
      </>
      {/* ) : (<p className="text-gray-800 font-medium text-lg mt-5">{fileName}</p> */}
      {/* )} */}
    </label>
  )
}

export default UploadFile
