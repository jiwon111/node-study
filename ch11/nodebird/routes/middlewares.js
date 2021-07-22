exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){//로그인 중이면
        next();
    }
    else{//로그인 중 아니면
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()){//로그인 중 아니면
        next();
    }
    else{
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};