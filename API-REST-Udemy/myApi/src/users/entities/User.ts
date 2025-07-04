import { Role } from "@roles/entities/Role";

import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar?: string;

  // Possuí um relacionamento muitos pra um com a entidade Role
  @ManyToOne(() => Role, {
    // cascade - Operações feitas nessa entidade também serão feitas na entidade relacionada (Role)
    cascade: true,
  })
  role: Role

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidv4();
  }
}
