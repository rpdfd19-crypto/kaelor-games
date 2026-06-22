'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cadastro() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', formData.nome);

    alert(`Conta criada com sucesso!\nBem-vindo(a), ${formData.nome}!`);
    router.push('/catalogo');
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-400 mb-3">KAELOR GAMES</h1>
          <p className="text-zinc-400">Crie sua conta</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Nome completo</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="Seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Senha</label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="Crie uma senha forte"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Confirmar Senha</label>
              <input
                type="password"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="Confirme sua senha"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 py-3.5 rounded-2xl font-semibold text-lg transition"
            >
              Criar Conta
            </button>
          </form>

          <div className="my-6 text-center text-zinc-500">ou</div>

          <button className="w-full border border-zinc-700 hover:bg-zinc-800 py-3.5 rounded-2xl font-medium transition flex items-center justify-center gap-3">
            🌐 Cadastrar com Google
          </button>

          <p className="text-center mt-8 text-zinc-400">
            Já tem conta?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}