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

  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lembrarEmail') !== null;
    }
    return false;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const adminEmail = "admin@kaelor.com";
    const adminSenha = "65f77c394c3e87468f28ce5705339f29ac17b151";

    if (email.toLowerCase() === adminEmail && senha === adminSenha) {
      // Login Admin
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', 'Vitor');
      localStorage.setItem('isAdmin', 'true');
      
      if (lembrar) localStorage.setItem('lembrarEmail', email);
      
      alert("✅ Login de Administrador realizado com sucesso!");
      router.push('/catalogo');
      return;
    } 
    else if (email && senha) {
      // Login de usuário comum (simulado)
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', email.split('@')[0]);
      localStorage.removeItem('isAdmin');
      
      if (lembrar) localStorage.setItem('lembrarEmail', email);
      
      alert("Login realizado com sucesso!");
      router.push('/catalogo');
    } 
    else {
      alert("Por favor, preencha email e senha.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-400 mb-3">KAELOR GAMES</h1>
          <p className="text-zinc-400">Entre na sua conta</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">E-mail ou Usuário</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="admin@kaelor.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
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
                  onChange={(e) => setLembrar(e.target.checked)}
                  className="accent-purple-600 w-4 h-4" 
                />
                Lembrar de mim
              </label>
              <Link href="#" className="text-purple-400 hover:text-purple-300">
                Esqueci minha senha
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 py-3.5 rounded-2xl font-semibold text-lg transition"
            >
              Entrar
            </button>
          </form>

          <div className="my-6 text-center text-zinc-500">ou</div>

          <button className="w-full border border-zinc-700 hover:bg-zinc-800 py-3.5 rounded-2xl font-medium transition flex items-center justify-center gap-3">
            🌐 Entrar com Google
          </button>

          <p className="text-center mt-8 text-zinc-400">
            Não tem conta?{' '}
            <Link href="/cadastro" className="text-purple-400 hover:text-purple-300 font-medium">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}