import app from './app';
import prisma from '../database/index';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Conexão com o banco de dados encerrada.');
  process.exit(0);
});
