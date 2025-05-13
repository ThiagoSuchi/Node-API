import { Role } from "@roles/entities/Role";

type CreateRoleDTO = {
  name: string
}

export class RolesRepository {
  private roles: Role[] = [];

  constructor() {
    this.roles = []
  }

  create({ name }: CreateRoleDTO) {
    const role = new Role();

    // Object.assign() serve para juntar dois ou mais objetos em um só.
    // É como fazer um merge (fusão) de objetos.
    Object.assign(role, {
      name,
      created_at: new Date()
    })

    this.roles.push(role);
    return role;
  }
}
