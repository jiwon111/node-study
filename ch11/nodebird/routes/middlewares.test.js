const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

describe('isLoggedIn', () => {
    test('로그인되어 있으면 isLoggedIn이 next를 호출해야 함', () => {

    });

    test('로그인되어 있지 않으면 isLoggedIn이 에러를 응답해야 함', () => {

    });
});

describe('isNotLoggedIn', () => {
    test('로그인되어 있으면 isNotLoggedIn이 에러를 응답해야 함', () => {

    });
    
    test('로그인되어 있지 않으면 isNotLoggedIn이 next를 호출해야 함', () => {

    });
});