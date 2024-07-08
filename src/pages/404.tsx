import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-sm text-gray-600 mb-8">요청 하신 페이지가 없어요!</p>
      <Link href="/">
        <p className="text-sm font-semibold text-blue-500 border-2 border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-300">
          홈으로 가기
        </p>
      </Link>
    </div>
  );
}
