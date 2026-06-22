import Link from 'next/link';
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const produtosDestaque = await prisma.product.findMany({
    where: { visivel: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section - Estilo Eneba/GGMax */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/gamingdark/1920/1080')] bg-cover bg-center opacity-40"></div>
        
        <div className="relative z-10 max-w-5xl px-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            OS MELHORES PREÇOS<br />EM JOGOS PC
          </h1>
          <p className="text-2xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            Chaves Steam • Epic • Gift Cards • DLCs • Contas<br />
            Entrega instantânea • Suporte 24h
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/catalogo"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-xl px-10 py-4 rounded-xl font-semibold transition transform hover:scale-105"
            >
              Explorar Catálogo
            </Link>
            <Link 
              href="/catalogo"
              className="inline-block border border-purple-500 hover:bg-purple-500/10 text-xl px-10 py-4 rounded-xl font-semibold transition"
            >
              Ver Ofertas
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          ↓
        </div>
      </section>

      {/* Destaques / Ofertas */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-4xl font-bold flex items-center gap-3">
            🔥 Ofertas em Destaque
          </h2>
          <Link href="/catalogo" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {produtosDestaque.map((produto) => {
            const desconto = produto.preco < 50 ? 35 : produto.preco < 100 ? 20 : 0;
            return (
              <div
                key={produto.id}
                className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-52 bg-zinc-950 overflow-hidden">
                  <Image 
                    src={produto.imagem || "https://picsum.photos/seed/game/400/300"} 
                    alt={produto.nome}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  {desconto > 0 && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      -{desconto}%
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 min-h-13">
                    {produto.nome}
                  </h3>
                  <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
                    {produto.descricao}
                  </p>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-green-400 text-2xl font-bold">
                        R$ {Number(produto.preco).toFixed(2)}
                      </span>
                    </div>
                    <Link 
                      href={`/jogo/${produto.id}`}
                      className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-xl text-sm font-medium transition"
                    >
                      Comprar
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categorias */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-zinc-950">
        <h2 className="text-4xl font-bold mb-10">Plataformas Populares</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Steam", "Epic Games", "EA App", "PlayStation", "Xbox", "Nintendo", "Rockstar", "Ubisoft"].map((plat) => (
            <div key={plat} className="bg-zinc-900 p-8 rounded-2xl border border-purple-500/30 hover:border-purple-500 hover:scale-105 transition text-center cursor-pointer">
              <h3 className="text-2xl font-bold">{plat}</h3>
              <p className="text-zinc-500 mt-2 text-sm">Chaves e Gift Cards</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-purple-400 text-xl mb-2">KAELOR GAMES</p>
          <p className="text-zinc-500">© 2026 - Todos os direitos reservados</p>
          <p className="text-zinc-600 text-sm mt-4">
            Entrega instantânea • Pagamento seguro • Suporte via WhatsApp
          </p>
        </div>
      </footer>
    </main>
  );
}