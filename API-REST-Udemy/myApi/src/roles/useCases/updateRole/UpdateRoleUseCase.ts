import { Role } from "@roles/entities/Role";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { AppError } from "@shared/utils/errors/AppErro";
import { inject, injectable } from "tsyringe";

type ShowRoleDTO = {
  id: string;
  name: string
}

@injectable()
export class UpdateRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository
  ) {}

  async execute({ id, name }: ShowRoleDTO): Promise<Role> {
    const role = await this.rolesRepository.findById(id);
    if (!role) {
      throw new AppError('Role not found.', 404);
    }

    const roleWithSameName = await this.rolesRepository.findByName(name);
    if (roleWithSameName && role.name !== roleWithSameName.name) {
      throw new AppError('Role name not informed or already in use.');
    }

    role.name = name;

    return this.rolesRepository.save(role);
  }
}
