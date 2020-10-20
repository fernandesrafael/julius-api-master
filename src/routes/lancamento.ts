import { UsuarioController } from './../controller/UsuarioController';
import { LancamentoController } from './../controller/LancamentoController';
import { Request, Response, Router } from 'express';
import { Lancamento } from '../entity/Lancamento';

export const routerLancamento = Router();
const lancamentoCtrl = new LancamentoController();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço para salvar um novo lançamento
 */
routerLancamento.post('/', async (req, res) => {
    const { idUsuario, valor, descricao, data } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
    if (usuario) {
        const lancamento = new Lancamento(valor, descricao, data, usuario);
        const lancamentoSalvo = await lancamentoCtrl.salvar(lancamento);
        res.json(lancamentoSalvo);
    } else {
        res.status(404).json({ mensagem: 'Usuário do lançamento não encontrado' });
    }
});

/**
 * Serviço para alterar lançamento
 */
routerLancamento.put('/:id', async (req, res) => {
    const { idUsuario, valor, descricao, data } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
    if (usuario) {
        const id = parseInt(req.params.id); 
        const lancamento = new Lancamento(valor, descricao, data, usuario); 
        const lancamentoAlterado = await lancamentoCtrl.alterar(lancamento, id);
        res.json(lancamentoAlterado);
    }else{
        res.status(404).json({ mensagem: 'Usuário do lançamento não encontrado' });
    }

});

/**
 * Serviço para deletar lançamento
*/

routerLancamento.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (id) {
        const lancamentoDelatado = await lancamentoCtrl.deletar(id);
        return res.send(lancamentoDelatado);
    }else{
        res.status(404).json({ mensagem: 'Lançamento não encontrado' });
    }
});
