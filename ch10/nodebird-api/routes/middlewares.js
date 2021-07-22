const jwt = require('jsonwebtoken');

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

exports.verifyToken = (req, res, next) => {
    try{
        //토큰 검증
        //인증에 성공한 경우에 토큰의 내용이 반환되어 req.decoded에 저장됨
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);//요청 헤더에 저장된 토큰 사용
        return next();
    }catch(err){
        if (err.name == 'TokenExpiredError'){//유효 기관 초과
            return res.status(419).json({
                code:419,
                message:'토큰이 만료되었습니다.',
            });
        }
        return res.status(401).json({
            code:401,
            message:'유효하지 않은 토큰입니다.',
        });
    }
};