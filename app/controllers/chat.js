module.exports.iniciaChat = function(application, req, res){

    var formData = req.body;
    req.assert('nickname', 'Name cannot be empty.').notEmpty();
    req.assert('nickname', 'Name must have between 3 and 15 caracs.').len(3, 15);

    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {validacao: errors});
    }

    application.get('io').emit('msgToClient', {nickname: formData.nickname, msg: 'new user in chatroom'});

    res.render('chat', {formData: formData});
}