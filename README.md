Como executar a aplicação

Entre no Visual Studio Code e abra dois Terminais (Terminal -> New Terminal OU Ctrl+Shift+ç)

Nos dois terminais, clique o botão de + e selecione Git Bash

Corra os seguintes comandos no primeiro terminal:

cd client

npm install

npm run dev

Corra os seguintes comandos no segundo terminal:

cd server

npm install

node --watch server.js

Questão 3:
O browser. O pedido chega ao server e este responde, mas sem o header Access-Control-Allow-Origin, o browser não entrega a resposta. A consola mostra "blocked by CORS policy" e não um erro HTTP, pois o server não dá erros.

Questão 4:
A app agora faz 1 request à /api/cartas ao abrir. Ao filtrar, faz 0 requests pois já usa as cartas que estão no estado. Na Ficha 3, os dados estavam escritos no App.jsx; agora vivem no server e o server apenas manda JSON. O HTML persiste a ser construído no browser.