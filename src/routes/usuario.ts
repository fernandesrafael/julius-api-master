import { Usuario } from './../entity/Usuario';
import { Router } from 'express';
import { UsuarioController } from '../controller/UsuarioController';

export const routerUsuario = Router();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço pra salvar um novo usuário
 */
routerUsuario.post('/', async (req, res) => {
    const { nome, email } = req.body;
    const usuario = new Usuario(nome, email);
    const usuarioSalvo = await usuarioCtrl.salvar(usuario);
    res.json(usuarioSalvo);
});

/**
 * Serviço para recuperar todos os usuários
 */
routerUsuario.get('/', async (req, res) => {
    const usuarios = await usuarioCtrl.recuperarTodos();
    res.json(usuarios);
});

/**
 * Serviço para recuperar os lançamentos de um determinado usuário
 */
routerUsuario.get('/lancamentos/:idUsuario', async (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const lancamentos = await usuarioCtrl.recuperarLancamentosDoUsuario(idUsuario);
    res.json(lancamentos);
});


/**
 * Serviço para retornar apenas os lançamentos que correspondem a entrada de dinheiro.
 */
routerUsuario.get('/lancamentos/entradas/:idUsuario', async (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const lancamentos = await usuarioCtrl.recuperarLancamentosDoUsuario(idUsuario);
    const gastos = await usuarioCtrl.recuperarGastosDoUsuario(lancamentos);
    res.json(gastos);
});


 /**
 * Serviço para retornar apenas os lançamentos que correspondem a gastos.
 */


routerUsuario.get('/lancamentos/gastos/:idUsuario', async (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const lancamentos = await usuarioCtrl.recuperarLancamentosDoUsuario(idUsuario);
    const entradas = await usuarioCtrl.recuperarEntradasDoUsuario(lancamentos);
    res.json(entradas);
});
