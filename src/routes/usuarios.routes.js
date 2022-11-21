const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario')
const bcrypt = require("bcrypt");
const fs = require("fs");

const dadosLocais = JSON.parse(fs.readFileSync("dados.json"));

router.post("/criar", (req, res) => {
    const { nome, email, senha } = req.body;
    if (!email || !senha) {
      res.status(422).send("Você deve definir email e senha");
    } else if (
      dadosLocais.find(
        (usuario) => usuario.nome === nome || usuario.email === email
      )
    ) {
      res.status(401).send("Nome ou email de usuário já está em uso");
    } else {
      var dadosUsuario = {
        nome: nome,
        email: email,
        senha: senha,
      };
      const salt = bcrypt.genSaltSync();
      dadosUsuario.hash = bcrypt.hashSync(senha, salt);
      dadosLocais.push(dadosUsuario);
      const dadosConvertidos = JSON.stringify(dadosLocais, null, 2);
      fs.writeFileSync("dados.json", dadosConvertidos);
      res.status(200);
    }
  });
router.post('/login', async (req, res) => {
    try {

        const credenciais = req.body;
        const usuario = await Usuario.findOne(credenciais);

        if(usuario) {
            res.json ({ error: false, usuario })
        } else {
            res.json({ error: true, message: 'Nenhum usuario encontrado' })
        }

    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
  
/*! router.post("/login", (req, res) => {

  
 const { email, senha } = req.body;
 if (!email || !senha) {
 res.status(422).send("Você deve definir email e senha");
}

 const usuario = dadosLocais.find((user) => user.email === email);
 
if (!usuario) {
 res.status(401).send("Email ou senha inválidos");
 }
 8
 if (!bcrypt.compareSync(senha, usuario.hash)) {
 res.status(401).send("Email ou senha inválidos");
 }
 
res.status(200).send({
email: usuario.email,
 nome: usuario.nome,
senha: usuario.senha,
 });
 });
*/
module.exports = router;