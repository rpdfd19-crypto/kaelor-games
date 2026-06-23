'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lembrarEmail') || '';
    }

    return '';
  });

  const [lembrar, setLembrar] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('lembrarEmail');
    }

    return false;
  });

  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        '/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            senha,
            lembrar,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            'Credenciais inválidas'
        );
        return;
      }

      if (lembrar) {
        localStorage.setItem(
          'lembrarEmail',
          email
        );
      } else {
        localStorage.removeItem(
          'lembrarEmail'
        );
      }

      router.push('/catalogo');
      router.refresh();
    } catch {
      alert(
        'Erro ao realizar login.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-400 mb-3">
            KAELOR GAMES
          </h1>

          <p className="text-zinc-400">
            Entre na sua conta
          </p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                E-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Senha
              </label>

              <input
                type="password"
                value={senha}
                onChange={(e) =>
                  setSenha(
                    e.target.value
                  )
                }
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lembrar}
                  onChange={(e) =>
                    setLembrar(
                      e.target.checked
                    )
                  }
                  className="accent-purple-600 w-4 h-4"
                />

                Lembrar de mim
              </label>

              <Link
                href="#"
                className="text-purple-400 hover:text-purple-300"
              >
                Esqueci minha senha
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 py-3.5 rounded-2xl font-semibold text-lg transition"
            >
              {loading
                ? 'Entrando...'
                : 'Entrar'}
            </button>
          </form>

          <div className="my-6 text-center text-zinc-500">
            ou
          </div>

          <button className="w-full border border-zinc-700 hover:bg-zinc-800 py-3.5 rounded-2xl font-medium transition flex items-center justify-center gap-3">
            🌐 Entrar com Google
          </button>

          <p className="text-center mt-8 text-zinc-400">
            Não tem conta?{' '}
            <Link
              href="/cadastro"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}