import { type } from "os";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Lancamento } from "./Lancamento";

@Entity()
export class Usuario {

    constructor(nome: string, email: string) {
        this.nome = nome;
        this.email = email;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @OneToMany(() => Lancamento, lancamento => lancamento.usuario)
    lancamentos: Lancamento[];

    @OneToMany(()=> Lancamento, lancamento => lancamento.usuario)
    gastos:Lancamento[];

    @OneToMany(()=> Lancamento, lancamento => lancamento.usuario)
    entradas:Lancamento[];

}
