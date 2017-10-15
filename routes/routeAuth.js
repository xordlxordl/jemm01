const passport = require('passport');


module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            // 구글인증을 마치고 서베이로 이동
            res.redirect('/survey');
        }
    );
    app.get('/api/logout', (req,res) => {
        req.logout();
        //res.send(req.user);
        res.redirect('/');
    });
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};