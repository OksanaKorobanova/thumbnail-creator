import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

const MAX_FILE_SIZE_MB = 5; // Maximum file size in MB

type FileUploaderProps = {
  onFileUpload: (file: File) => void;
};

const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
          setError(`File size exceeds ${MAX_FILE_SIZE_MB} MB limit`);
          return;
        }

        // If valid, clear error and process file
        setError(null);
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    multiple: false,
  });

  return (
    <div className='mb-4'>
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-all duration-200',
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-100',
          'hover:border-blue-400 hover:bg-blue-50'
        )}>
        <input {...getInputProps()} />
        <UploadIcon className='text-gray-400 w-12 h-12 mb-2' />
        <p className='text-gray-600 text-lg font-medium'>
          {isDragActive
            ? 'Drop the image here...'
            : 'Drag & drop an image here, or click to upload'}
        </p>
        <p className='text-gray-400 text-sm'>
          PNG, JPG, or JPEG (max {MAX_FILE_SIZE_MB} MB)
        </p>
      </div>

      {/* Error message */}
      {error && <p className='text-red-500 mt-2 text-sm'>{error}</p>}
    </div>
  );
};

export default FileUploader;
