import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        nome: "GTA V",
        descricao: "Grand Theft Auto V",
        preco: 59.9,
        plataforma: "PC",
        imagem: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg",
        visivel: true,
        destaque: true,
        estoque: 100,
      },
      {
        nome: "Red Dead Redemption 2",
        descricao: "Aventura no velho oeste",
        preco: 129.9,
        plataforma: "PC",
        imagem: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg",
        visivel: true,
        destaque: true,
        estoque: 50,
      },
      {
        nome: "Cyberpunk 2077",
        descricao: "RPG futurista em Night City",
        preco: 149.9,
        plataforma: "PC",
        imagem: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7497.jpg",
        visivel: true,
        destaque: true,
        estoque: 80,
      },
      {
        nome: "Elden Ring",
        descricao: "RPG de ação da FromSoftware",
        preco: 199.9,
        plataforma: "PC",
        imagem: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg",
        visivel: true,
        destaque: true,
        estoque: 60,
      },
      {
        nome: "God of War",
        descricao: "Kratos e Atreus em Midgard",
        preco: 149.9,
        plataforma: "PC",
        imagem: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3ddx.jpg",
        visivel: true,
        destaque: true,
        estoque: 40,
      },
      {
        nome: "Hogwarts Legacy",
        descricao: "Aventura no universo Harry Potter",
        preco: 179.9,
        plataforma: "PC",
        imagem: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg",
        visivel: true,
        destaque: false,
        estoque: 30,
      },
      {
        nome: "The Witcher 3",
        descricao: "Geralt de Rívia em uma jornada épica",
        preco: 79.9,
        plataforma: "PC",
        imagem: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
        visivel: true,
        destaque: false,
        estoque: 70,
      },
      {
        nome: "Minecraft",
        descricao: "Construa e sobreviva em mundos infinitos",
        preco: 99.9,
        plataforma: "PC",
        imagem: "https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.jpg",
        visivel: true,
        destaque: true,
        estoque: 999,
      },
      {
        nome: "EA FC 25",
        descricao: "A experiência definitiva do futebol",
        preco: 249.9,
        plataforma: "PC",
        imagem: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8i8j.jpg",
        visivel: true,
        destaque: true,
        estoque: 100,
      },
      {
        nome: "Call of Duty Black Ops 6",
        descricao: "Ação militar intensa",
        preco: 299.9,
        plataforma: "PC",
        imagem: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8w0x.jpg",
        visivel: true,
        destaque: true,
        estoque: 100,
      },
    ],
  });

  console.log("Produtos cadastrados!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });