'use client';

import { useCart } from "@/lib/cart-context";
import Link from 'next/link';
import Image from 'next/image';

export default function Carrinho() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-6">🛒</div>

        <h1 className="text-4xl font-bold mb-4">
          Seu carrinho está vazio
        </h1>

        <p className="text-zinc-400 mb-8">
          Adicione alguns jogos incríveis!
        </p>

        <Link
          href="/catalogo"
          className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl text-lg transition"
        >
          Ir para o Catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">
          🛒 Seu Carrinho
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de itens */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 rounded-2xl p-6 flex gap-6"
              >
                <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={
                      item.imagem ||
                      "https://picsum.photos/seed/game/400/300"
                    }
                    alt={item.nome}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {item.nome}
                  </h3>

                  <p className="text-green-400 text-2xl font-bold">
                    R$ {Number(item.preco).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center border border-zinc-700 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantidade - 1)
                        }
                        className="px-4 py-2 hover:bg-zinc-800 transition"
                      >
                        -
                      </button>

                      <span className="px-6 py-2">
                        {item.quantidade}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantidade + 1)
                        }
                        className="px-4 py-2 hover:bg-zinc-800 transition"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo do pedido */}
          <div className="bg-zinc-900 rounded-2xl p-8 h-fit sticky top-6">
            <h2 className="text-2xl font-bold mb-6">
              Resumo do Pedido
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span className="text-zinc-400">Subtotal</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg">
                <span className="text-zinc-400">Frete</span>
                <span className="text-green-400">Grátis</span>
              </div>
            </div>

            <div className="border-t border-zinc-700 pt-6 mb-8">
              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-2xl text-xl font-semibold mb-4 transition">
              Finalizar Compra
            </button>

            <button
              onClick={clearCart}
              className="w-full border border-zinc-700 hover:bg-zinc-800 py-3 rounded-2xl text-sm transition"
            >
              Limpar Carrinho
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}