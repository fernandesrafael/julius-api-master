import { executionAsyncId } from "async_hooks";
import { getManager } from "typeorm";
import { Lancamento } from "../entity/Lancamento";
import { Usuario } from "../entity/Usuario";

export class UsuarioController {

    async salvar(usuario: Usuario) {
        const usuarioSalvo = await getManager().save(usuario);
        return usuarioSalvo;
    }

    async recuperarTodos() {
        const usuarios = await getManager().find(Usuario);
        return usuarios;
    }

    async recuperarPorId(id: number) {
        const usuario = await getManager().findOne(Usuario, id);
        return usuario;
    }

    async recuperarLancamentosDoUsuario(id: number) {
        const usuario = await getManager().findOne(Usuario, id, {
            relations: ['lancamentos']
        });
        return usuario.lancamentos;
    }

    async recuperarEntradasDoUsuario(lancamentos){
        const entradas = await getManager()
       .createQueryBuilder(lancamentos, "lancamentos")
       .where("lancamentos.valor > :zero", { zero: 0 })
       .getOne();
       return entradas;
   }

    async recuperarGastosDoUsuario(lancamento){
         const gastos = await getManager()
        .createQueryBuilder(lancamento, "lancamentos")
        .where("lancamentos.valor < :zero", { zero: 0 })
        .getOne();
        return gastos;
    }

}