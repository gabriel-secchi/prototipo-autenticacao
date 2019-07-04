var express = require('express'); //framework
var consign = require('consign'); //Modulo de carregamento de dados parao app
var bodyParser = require('body-parser');  //middleware para converter e agilizar oprocesso de captação de parâmetros

//Modulo de carregamento e leitura do arquivo .env
require('dotenv-safe').load(); 

const config = require('./config.json');
const jwt = require('jsonwebtoken');
//var MyRedis  = require('../model/MyRedis')
//var DB = [];

const environment = process.env.ENVIRONMENT || 'development';
global.gConfig = config[environment];

var api = express();
api.jwt = jwt;

/* configure middleware body-parser */
api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

/*  configure autoload of routes and controllers to app */
consign()
	.include('routes')
	//.then('controllers')
	.into(api);

api.use(function(request, response, next){
	response.status(404).json({error: {code: 404, description: "Not found"}});
	next();
});

module.exports = api;
