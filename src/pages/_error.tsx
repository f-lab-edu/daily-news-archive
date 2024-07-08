import Link from 'next/link';
import { NextPageContext } from 'next/types';

const Error = ({ statusCode }: { statusCode: number }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">
        {statusCode ? statusCode : 'Error'}
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

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
