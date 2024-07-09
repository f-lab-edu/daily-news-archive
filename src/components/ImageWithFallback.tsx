import { useState, useEffect } from 'react';
import Image from 'next/image';

interface FallbackImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  width: number;
  height: number;
  className?: string;
}

const FallbackImage = ({
  src,
  alt,
  fallbackSrc,
  width,
  height,
  className
}: FallbackImageProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    setImageSrc(src);
    setLoading(true);
    setErrorCount(0);
  }, [src]);

  const handleImageError = () => {
    if (errorCount < 2) {
      setErrorCount(prev => prev + 1);
      setLoading(true);
    } else {
      setImageSrc(fallbackSrc);
      setLoading(false);
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative">
      <Image
        src={errorCount >= 2 ? fallbackSrc : imageSrc}
        alt={alt}
        width={width}
        height={height}
        onError={handleImageError}
        onLoad={handleImageLoad}
        className={className}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  );
};

export default FallbackImage;
