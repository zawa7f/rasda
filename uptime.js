const express = require('express');
const app = express();
const port = 3000;
const fetch = require("node-fetch");
let url = "";
let uptimeDate = Date.now();
let requests = 0;
let response = null; 
app.use((req, res, next) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];
    const domain = hostname.replace(`${subdomain}.`, '');
    req.subdomain = subdomain;
    req.domain = domain;
    url = `https://${subdomain}.${domain}/`
    next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at ${url}`));


process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

setInterval(async () => {
     console.log(url);
     try {
         response = await fetch(url, { method: 'HEAD' });
         requests += 1;
         console.log(`Request done with status ${response.status} ${requests}`);
     } catch (error) {
         if (error.response) {
             requests += 1;
             console.log(`Response status: ${error.response.status}${requests}`);
         }
     } finally {
         response = null; 
     }
}, 15000);

module.exports = {
  uptimeDate
};