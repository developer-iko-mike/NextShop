import Link from "next/link";
import Container from "./../Components/Container";

export default function Home() {
  return (
    <Container>
      <div
        className="flex flex-col items-center justify-center min-h-[70vh] relative overflow-hidden rounded-3xl shadow-2xl bg-cover bg-center mt-16 bg-emerald-900"
        style={{
          backgroundImage: "url('https://picsum.photos/600/300?blur=2')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4 animate-bounce">
            🛍️ Welcome to LeachShop! <span className="inline-block">🛒</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 text-center max-w-2xl font-medium animate-fade-in">
            Discover a variety of amazing products and enjoy a fun shopping
            experience! <span className="inline-block animate-spin">😍</span>
          </p>
          <Link
            href="/store"
            className="inline-block px-8 py-4 bg-[#68B984]/90 text-white rounded-xl shadow-lg hover:bg-[#4e8c6c] transition-colors duration-200 font-bold text-lg animate-pulse hover:scale-105 active:scale-95"
          >
            Go to Store <span className="ml-2">🛍️</span>
          </Link>
        </div>
      </div>
    </Container>
  );
}