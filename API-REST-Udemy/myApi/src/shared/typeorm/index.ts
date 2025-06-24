import { DataSource } from "typeorm"
import { CreateRolesTable1748552621145 } from "./migrations/1748552621145-CreateRolesTable"
import { Role } from "@roles/entities/Role"
import { CreateUsersTable1750281006168 } from "./migrations/1750281006168-CreateUsersTable"
import { AddRoleIdToUsersTable1750775931508 } from "./migrations/1750775931508-AddRoleIdToUsersTable"
import { User } from "@users/entities/User"

// Configuração principal com o database
export const dataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/db.sqlite",
  entities: [Role, User],
  migrations: [
    CreateRolesTable1748552621145,
    CreateUsersTable1750281006168,
    AddRoleIdToUsersTable1750775931508
  ],
})
