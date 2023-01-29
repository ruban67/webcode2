const http = require('http');
const express = require('express');
const port = 5000;
const host = 'localhost'
const {amazon} = require('./Controller/amazonScrapper');

const app = express();


const main = () =>{
    console.log('Running amazon');
    amazon();
}


const server = http.createServer(app);

app.get('/',(req,res)=> {
    res.send('welcome to ecommmerce...')
});

server.listen(port, host, ()=> {
    console.log(`Server running at http://${host}:${port}`);
    main();
})
