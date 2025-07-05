/* Arquivo de definição de tipagens */

// Overwritten - Sobrescrita de tipo do express
declare namespace Express {
  interface Request {
    user: {
      id: string
    }
  }
}
