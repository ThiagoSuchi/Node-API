import { DataSource } from "typeorm"

// Configuração principal da fonte de dados
export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [],
  migrations: [],
})
