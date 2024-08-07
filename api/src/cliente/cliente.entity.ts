import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Servico } from 'src/servico/servico.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100 })
  telefone: string;

  @Column({ length: 100 })
  cpf: string;

  @Column({ length: 255 })
  endereco: string;

  @Column({ length: 100 })
  bairro: string;

  @Column()
  numero: number;

  @Column({ length: 100 })
  complemento: string;

  @OneToMany(() => Servico, (servico) => servico.cliente)
  servicos: Servico[];
}
