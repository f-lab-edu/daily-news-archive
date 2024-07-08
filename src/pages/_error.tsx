import Link from 'next/link';
import { NextPageContext } from 'next/types';

const CustomError = ({ statusCode }: { statusCode: number }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">
        {statusCode || 'Error'}
      </h1>
      <p className="text-xl text-gray-700 mb-4">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
      <Link href="/">
        <p className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
          홈으로 가기
        </p>
      </Link>
    </div>
  );
};

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  if (res) {
    return { statusCode: res.statusCode };
  }
  return err ? err.statusCode : 404;
};

export default CustomError;
