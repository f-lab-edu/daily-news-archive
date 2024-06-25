import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>this is the home page</h1>

      <Link href="/news/page">go to news page</Link>
    </main>
  );
}
