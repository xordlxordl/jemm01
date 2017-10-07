
const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

//
const User = mongoose.model('users');

// 몽고db에 의해 생성된 id 로 직렬화 -> 쿠키생성을 위해
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// 몽구스 모델 인스턴스에 요청
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },  
    (accessToken, refreshToken, profile, done) => {
        //console.log('access token:', accessToken);
        //console.log('refreshToken token:', refreshToken);
        console.log('profile: ', profile);
        User.findOne({googleId:profile.id})
        .then((existingUser) => {
            if(existingUser) {
                console.log('exist: ', profile.id);
                // we already have a record with the given prifile Id
                done(null, existingUser);
            } else {
                console.log('new one: ', profile.id);
                // model instance
                new User({googleId:profile.id})
                .save()
                .then(user => done(null, user));
            }
        });
    }
));
