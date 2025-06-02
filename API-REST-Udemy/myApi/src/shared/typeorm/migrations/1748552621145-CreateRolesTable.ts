import { MigrationInterface, QueryRunner, Table } from "typeorm";

// Migração no TypeORM é um jeito de registrar e aplicar mudanças no banco com segurança, versão e organização.
export class CreateRolesTable1748552621145 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          }
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles')
  }
}
/* Comandos comuns no TypeORM:
typeorm migration:create	Cria uma nova migration vazia
typeorm migration:generate	Gera automaticamente com base nas entidades
typeorm migration:run	Aplica todas as migrations pendentes
typeorm migration:revert	Desfaz a última migration aplicada
*/
