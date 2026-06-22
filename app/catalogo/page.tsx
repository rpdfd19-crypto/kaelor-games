import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function Catalogo() {
  const produtos = await prisma.product.findMany({
    where: { visivel: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-black text-white pb-16">
      {/* Header do Catálogo */}
      <div className="bg-zinc-950 border-b border-purple-500 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-3">Catálogo de Jogos</h1>
          <p className="text-zinc-400 text-lg">
            Encontre os melhores preços em chaves Steam, Epic, Gift Cards e mais
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="flex justify-between items-center mb-8">
          <p className="text-zinc-400">
            {produtos.length} jogos encontrados
          </p>
          
          <select className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm">
            <option>Mais recentes</option>
            <option>Preço: Menor para Maior</option>
            <option>Preço: Maior para Menor</option>
            <option>Promoções</option>
          </select>
        </div>

        {/* Grid de Jogos - Estilo Eneba/GGMax */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {produtos.map((produto) => {
            const desconto = produto.preco < 50 ? 35 : produto.preco < 100 ? 20 : 0;
            
            return (
              <div
                key={produto.id}
                className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-52 bg-zinc-950 flex items-center justify-center overflow-hidden">
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
                    
                    <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-xl text-sm font-medium transition">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {produtos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-zinc-400">Nenhum jogo disponível no momento.</p>
          </div>
        )}
      </div>
    </main>
  );
}