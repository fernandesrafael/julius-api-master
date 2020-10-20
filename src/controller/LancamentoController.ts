import { getManager } from 'typeorm';
import { Lancamento } from "../entity/Lancamento";

export class LancamentoController {

    async salvar(lancamento: Lancamento) {
        const lancamentoSalvo = await getManager().save(lancamento);
        return lancamentoSalvo;
    }
    async alterar(lancamento: Lancamento, id:number) {
        const lancamentoAlterado = await getManager().update(Lancamento, id, lancamento);
        return lancamentoAlterado;
    }
    async deletar(id:number) {
        const lancamentoDeletado = await getManager().delete(Lancamento, id);
        return lancamentoDeletado;
    }
}