module.exports = function(app){
	app.post('/auth', (request, response) => {
        if(request.body.user === 'luiz' && request.body.pwd === '123'){
            //auth ok
            const id = 1; //esse id viria do banco de dados
            var token = app.jwt.sign({sub: id, iss: process.env.API_NAME}, process.env.SECRET, {
                expiresIn: 300 // expires in 5min
            });
            response.status(200).send({ auth: true, token: token });
        }
        else {
            response.status(401).send({ auth: false, message: "Login inválido" });
        }
	});
}
