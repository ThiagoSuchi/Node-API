import { Role } from "@roles/entities/Role";
import { dataSource } from "@shared/typeorm";
import { Repository } from "typeorm";

type CreateRoleDTO = {
  name: string;
}

export type PaginateParams = {
  page: number;
  skip: number;
  take: number;
}

export type RolesPaginateProperties = {
  per_page: number;
  total: number;
  currentPage: number;
  data: Role[]
}

export class RolesRepository {
  private repository: Repository<Role>;
  private static INSTANCE: RolesRepository; // única instância da classe (compartilhada)

  private constructor() {
    this.repository = dataSource.getRepository(Role)
  }

  public static getInstance(): RolesRepository {
    if (!RolesRepository.INSTANCE) {
      // se ainda não existe uma instância, cria
      RolesRepository.INSTANCE = new RolesRepository();
    };

    // retorna a mesma instância sempre
    return RolesRepository.INSTANCE;
  }

  async create({ name }: CreateRoleDTO): Promise<Role> {
    const role = this.repository.create({ name })
    return this.repository.save(role);
  }

  async save(role: Role): Promise<Role> {
    return this.repository.save(role);
  }

  async delete(role: Role): Promise<void> {
    await this.repository.remove(role)
  }

  async findAll({ page, skip, take }: PaginateParams): Promise<RolesPaginateProperties> {
    const [roles, count] = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount()
    const result = {
      per_page: take,
      total: count,
      currentPage: page,
      data: roles,
    }

    return result
  }

  async findByName(name: string): Promise<Role | null> {
    return this.repository.findOneBy({ name });
  }

  async findById(id: string): Promise<Role | null> {
    return this.repository.findOneBy({ id });
  }
}
