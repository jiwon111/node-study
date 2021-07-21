const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
    }, async (email, password, done) => {
        try{
            const exUser = await User.findOne({where:{email}});//같은 이메일이 있는지 찾고
            if (exUser){//있으면
                const result = await bcrypt.compare(password, exUser.password);//비밀번호도 일치하는지 
                if (result){//일치하면
                    done(null, exUser);
                }else{//일치하지 않으면
                    done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                }
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};