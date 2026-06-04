import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-3xl lg:text-4xl font-bold text-neutral mb-4">
          僑外生留台工作評點制
        </h1>
        <p className="text-gray-500 mb-8">
          快速計算您的評點分數，了解是否達到 70 分門檻取得工作許可
        </p>
        <Link
          href="/calculator"
          className="inline-block bg-primary text-white font-medium px-8 py-3 rounded-xl hover:bg-primary-light transition-colors shadow-lg shadow-blue-200"
        >
          開始計算
        </Link>
        <p className="text-xs text-gray-400 mt-6">
          本工具僅供參考，實際審核以勞動部公告規則為準
        </p>
      </div>
    </main>
  );
}
