const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// 몽고에 모델생성
require('./models/Users');

// 모델 
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession( {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in mils
        keys: [keys.cookieKey]
    })
);


app.use(passport.initialize());
app.use(passport.session());

require('./routes/routeAuth')(app);
require('./routes/billingRoutes')(app); // 빌링 라우터 호출

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
//app.get('/', (req,res)=> {
//    res.send({hi:'there'});
//});

const PORT = process.env.PORT || 5000;
app.listen(PORT);