'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthUser = {
  loggedIn: boolean;
  name: string;
  role: 'USER' | 'ADMIN';
};

export default function Navbar() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });

    setUser(null);

    router.push('/');
    router.refresh();
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="bg-zinc-950 border-b border-purple-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-3xl font-bold text-purple-400"
          >
            KAELOR GAMES
          </Link>

          <div className="flex gap-6 text-sm">
            <Link
              href="/catalogo"
              className="hover:text-purple-400 transition"
            >
              Catálogo
            </Link>

            <Link
              href="#"
              className="hover:text-purple-400 transition"
            >
              Ofertas
            </Link>

            <Link
              href="#"
              className="hover:text-purple-400 transition"
            >
              Mais Vendidos
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8">
          <input
            type="text"
            placeholder="Buscar jogos, chaves..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/carrinho"
            className="hover:text-purple-400 transition text-2xl"
          >
            🛒
          </Link>

          {user?.loggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">
                Olá,{' '}
                <span className="text-purple-400 font-medium">
                  {user.name}
                </span>
              </span>

              {user.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="bg-yellow-600 hover:bg-yellow-700 px-5 py-2.5 rounded-xl text-sm font-medium transition"
                >
                  👑 Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-xl text-sm font-medium transition"
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-xl font-medium transition"
              >
                Login
              </Link>

              <Link
                href="/cadastro"
                className="border border-purple-500 hover:bg-purple-500/10 px-6 py-2.5 rounded-xl font-medium transition"
              >
                Cadastro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}