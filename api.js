/* server configs */
var app = require('./config/api.config');

app.listen(global.gConfig.node_port, function(){
	console.log('Online service');
});
