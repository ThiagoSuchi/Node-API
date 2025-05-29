import { DataSource } from "typeorm"

// Configuração principal com o database
export const dataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/db.sqlite",
  entities: [],
  migrations: [],
})
