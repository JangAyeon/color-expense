import Image, { type ImageProps } from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fefefe] to-[#f5f7fa] flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6">
        <Image
          aria-hidden
          src="/Blockie.svg"
          alt="Window icon"
          width={350}
          height={538}
          className="drop-shadow-xl transition-transform hover:scale-105 duration-300"
        />
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Blockie
          </h1>
          <p className="text-lg text-gray-500">
            오늘도 한 블럭, 지갑 방어 완료!
          </p>
        </div>
      </div>
    </main>
  );
}
