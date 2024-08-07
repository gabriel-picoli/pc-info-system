import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Cliente } from '../cliente/cliente.entity';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  descricao: string;

  @Column()
  data: string;

  @Column()
  valor: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.servicos)
  cliente: Cliente;
}
