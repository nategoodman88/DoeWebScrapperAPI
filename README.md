# DoeWebScraperAPI

A web scrapper and API built with Node JS to facilitate matching of John and Jane Doe cases with missing persons reports from the Doe Network


Very Early WIP


To run:


Install NPM and Node JS https://docs.npmjs.com/cli/v7/configuring-npm/install or sudo apt install nodejs npm 

Run in terminal:

npm i express cheerio axios

CD to file path of repository 

node app.js 

Open browser to localhost:6900 OR Use Postman (Reccommended)

Paths:

/getmaledoes -> gets all US male does from DoeNetwork

/getfemaledoes -> gets all US female does from DoeNetwork

/getmalemissing -> gets all US male missing persons from DoeNetwork

/getfemalemissing -> gets all US female missing persons from DoeNetwork


Coming Next:

Path to output the return of a function that compares the doe arrays with their gender-equivalent missing person arrays and finds similarities
