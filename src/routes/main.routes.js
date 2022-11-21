const express = require('express')
const router = express.Router();
const _ = require('underscore')
const Filme = require('../models/filme');
const Usuario = require('../models/usuario');

// RECUPERAR TELA HOME
router.get('/home', async (req, res) => {
    try {
        let filmes = await Filme.find({});
        let finalFilmes = [];

        for (let filme of filmes) {
            const newFilme = { ...filme._doc };
            finalFilmes.push(newFilme)
        }
        //MISTURAR FILMES
        finalFilmes = _.shuffle(finalFilmes);

        //FILME PRINCIPAL
        const principal = finalFilmes[0];

        //SEPARAR POR SEÇÕES
        const secoes = _.chunk(finalFilmes, 5);

        res.json({ error: false, principal, secoes })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }

})

// RECUPERAR TUDOS OS REGISTROS
router.get('/', async (req, res) => {
    try {

        const filmes = await Filme.find({});
        res.json({ error: false, filmes })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }

})

//PEGAR somente O REGISTRO COM O ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const filme = await Filme.findById(id);
        res.json({ error: false, filme })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
});

//CRIAR UM REGISTRO
router.post('/criar', async (req, res) => {
    try {
        const usuarios = req.body;
        const response = await new Usuario(usuarios).save();
        res.json({ error: false, usuarios: response });
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});

//ATUALIZAR SOMENTE O REGISTRO COM O ID
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const novo_filme = req.body;

        const filme = await Filme.findByIdAndUpdate(id, novo_filme);
        res.json({ error: false, filme });

    } catch (err) {
        res.json({ error: true, message: err.message })
    }
});

//DELETAR SOMENTE O REGISTRO COM O ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Filme.findByIdAndDelete(id);
        res.json({ error: false })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }

    const id = req.params.id;
    res.json({ mensagem: `deletar somente O REGISTRO COM O ID: ${id}` });
});




module.exports = router;