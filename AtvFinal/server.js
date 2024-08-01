const express = require('express');
const app = express();
const port = 3000;

// Servir arquivos estáticos
app.use(express.static('public'));

// Configurar a rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
