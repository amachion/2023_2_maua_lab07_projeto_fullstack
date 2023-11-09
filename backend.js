const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
app.use(cors());

const Filme = mongoose.model ("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    senha: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model("Usuario", usuarioSchema);

async function conectarMongoDB () {
    await mongoose.connect(`mongodb+srv://usuario:senha@cluster0.skf8n.mongodb.net/?retryWrites=true&w=majority`)
}

//ponto de acesso para requisições get /oi
//http://localhost:3000/oi
app.get ('/oi', (req, res) => {res.send('oi')});

//ponto de acesso para requisições get /filmes
app.get ('/filmes', async (req, res) => {
    const filmes = await Filme.find();
    res.json(filmes);
});

//ponto de acesso para requisições post (armazenar) um novo filme
app.post ('/filmes', async (req, res) => {
    //obter os dados do usuário
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    //montar o objeto Json
    const filme = new Filme ({titulo: titulo, sinopse: sinopse});
    await filme.save();
    const filmes = await Filme.find();
    res.json(filmes);
});
app.post ('/signup', async (req, res) => {
    const login = req.body.login;
    const senha = req.body.senha;
    const criptografada = await bcrypt.hash(senha, 10);
    const usuario = new Usuario({
        login: login, 
        senha: criptografada
    });
    const respostaDoMongo = await usuario.save();
    console.log (respostaDoMongo);
    res.end();
})



app.listen(3000, () => {
    try {
        conectarMongoDB();
        console.log('conexão ok e app up & running');
    }
    catch (e) {
        console.log ('erro:', e);
    }
});
