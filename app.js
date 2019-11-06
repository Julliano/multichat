/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
app.listen(8080, function(){
    console.log('Servidor online porta 8080');
})