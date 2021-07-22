const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {//로그인 시 실행됨->사용자 정보 객체를 세션에 아이디로 저장함
        done(null, user.id);//세션에 사용자 정보를 모두 저장하면 용량이 커지기 때문에 아이디만 저장
    });

    passport.deserializeUser((id, done) => {//매 요청 시 실행->세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴
        User.findOne({where:{id},//사용자 정보 불러올 때 팔로워와 팔로잉 목록도 같이 불러옴
        include:[{
            model:User,
            attributes:['id', 'nick'],
            as:'Followers',
        }, {
            model:User,
            attributes:['id', 'nick'],
            as:'Followings',
        }],
    })
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    local();
    kakao();
};