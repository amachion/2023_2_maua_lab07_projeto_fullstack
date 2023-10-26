const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let filmes = [
    {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks),um rapaz com QI abaixo da média e boas intenções."
    },
    {
    titulo: "Um Sonho de Liberdade",
    sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]

//ponto de acesso para requisições get /oi
//http://localhost:3000/oi
app.get ('/oi', (req, res) => {res.send('oi')});

//ponto de acesso para requisições get /filmes
app.get ('/filmes', (req, res) => res.send(filmes));

//ponto de acesso para requisições post (armazenar) um novo filme
app.post ('/filmes', (req, res) => {
    //obter os dados do usuário
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    //montar o objeto Json
    const filme = {
        titulo: titulo, 
        sinopse: sinopse
    };
    filmes.push(filme);
    //só para conferir
    res.send(filmes);
});

app.listen(3000, () => console.log('app up & running'));