'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPanel() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = () => {
      const adminStatus = localStorage.getItem('isAdmin') === 'true';
      
      if (!adminStatus) {
        alert("Acesso negado! Apenas administradores podem entrar aqui.");
        router.push('/catalogo');
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Verificando permissão de administrador...</p>
      </main>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold text-purple-400">👑 Painel Administrativo</h1>
          <Link 
            href="/catalogo"
            className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl"
          >
            ← Voltar ao Catálogo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 p-8 rounded-2xl border border-purple-500 hover:border-purple-400 transition">
            <h2 className="text-2xl font-bold mb-4">Gerenciar Produtos</h2>
            <p className="text-zinc-400 mb-6">Adicionar, editar ou remover jogos do catálogo.</p>
            <button className="bg-purple-600 hover:bg-purple-700 w-full py-3 rounded-xl">
              Acessar Produtos
            </button>
          </div>

          <div className="bg-zinc-900 p-8 rounded-2xl border border-purple-500 hover:border-purple-400 transition">
            <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
            <p className="text-zinc-400 mb-6">Ver e gerenciar compras dos clientes.</p>
            <button className="bg-purple-600 hover:bg-purple-700 w-full py-3 rounded-xl">
              Ver Pedidos
            </button>
          </div>

          <div className="bg-zinc-900 p-8 rounded-2xl border border-purple-500 hover:border-purple-400 transition">
            <h2 className="text-2xl font-bold mb-4">Usuários</h2>
            <p className="text-zinc-400 mb-6">Gerenciar contas de usuários.</p>
            <button className="bg-purple-600 hover:bg-purple-700 w-full py-3 rounded-xl">
              Gerenciar Usuários
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}