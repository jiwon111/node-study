const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

//회원가입 라우터
router.post('/join', isNotLoggedIn, async(req, res, next) => {
    const {email, nick, password} = req.body;
    try{
        const exUser = await User.findOne({where:{email}});//같은 이메일 있으면 이미 있는 User
        if (exUser){//exUser면
            return res.redirect('/join?error=exist');//회원가입 페이지로 돌려보냄
        }
        const hash = await bcrypt.hash(password, 12);//비밀번호 암호화
        await User.create({//사용자 정보 생성
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    }catch(error){
        console.error(error);
        return next(error);
    }
});

//로그인 라우터
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {//passport가 미들웨어인데 라우터 안에 들어 있음
        if (authError){//로그인 실패
            console.error(authError);
            return next(authError);
        }
        if (!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);//미들웨어 내의 미들웨어에는 (req, res, next)를 붙임
});

//로그아웃 라우터
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();//req.user객체 제거
    req.session.destroy();//req.session 객체의 내용을 제거
    res.redirect('/');//메인 페이지로 되돌아감
});

//카카오 로그인 라우터
router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect:'/',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;