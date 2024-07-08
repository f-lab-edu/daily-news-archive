import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        500 - Server Error
      </h1>
      <p className="text-sm text-gray-600 mb-8">서버 에러가 발생했습니다!</p>
      <Link href="/">
        <p className="text-sm font-semibold text-blue-500 border-2 border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300">
          홈으로 가기
        </p>
      </Link>
    </div>
  );
}
