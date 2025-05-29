import 'dotenv/config';
import 'reflect-metadata';// Lib que permite guardar e acessar metadados( informações que descrevem o conteúdo (mas não são o conteúdo em si)).
import { app } from './app';
import { dataSource } from '@shared/typeorm';

const port = process.env.PORT || 3001;

// Após a inicialização bem sucedida do dataSource, o servidor é iniciado
dataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}/`);
  });
})

