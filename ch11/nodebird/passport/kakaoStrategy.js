const passport = require('passport');
const KaKaoStrategy = require('passport-kakao').Strategy;//카카오 모듈

const User = require('../models/user');

module.exports = () => {
    passport.use(new KaKaoStrategy({
        clientID:process.env.KAKAO_ID,//카카오에서 발급
        callbackURL:'/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try{
            const exUser = await User.findOne({//기존에 카카오를 통해 회원가입한 사용자인지 찾음
                where:{snsId:profile.id, provider:'kakao'},
            });
            if(exUser){
                done(null, exUser);
            }else{//아니면
                const newUser = await User.create({//회원가입 진행
                    email:profile._json && profile._json.kakao_accout_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider:'kakao',
                });
                done(null, newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};