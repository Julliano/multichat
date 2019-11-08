module.exports.iniciaChat = function(application, req, res){

    var formData = req.body;
    req.assert('apelido', 'Name cannot be empty.').notEmpty();
    req.assert('apelido', 'Name must have between 3 and 15 caracs.').len(3, 15);

    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {validacao: errors});
    }

    application.get('io').emit('msgToClient', {nickname: formData.apelido, msg: 'new user in chatroom'});

    res.render('chat');
}