import { DataSource } from "typeorm"
import { CreateRolesTable1748552621145 } from "./migrations/1748552621145-CreateRolesTable"

// Configuração principal com o database
export const dataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/db.sqlite",
  entities: [],
  migrations: [CreateRolesTable1748552621145],
})
