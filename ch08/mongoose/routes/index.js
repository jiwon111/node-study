const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const users = await User.find({});//모든 사용자 찾고
        res.render('mongoose', {users});//mongoose.html을 렌더링할 때 users 변수로 넣는다.
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;