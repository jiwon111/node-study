const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use((req, res, next)=>{
    console.log('모든 요청에 다 실행됨');
    next();
});

app.get('/', (req, res, next) => {
  //res.send('Hello Express');
  //res.sendFile(path.join(__dirname, '/index.html'));//html파일 열리게 할 때
  console.log('GET / 요청에서만 실행');
  next();
}, (req, res)=>{
    throw new Error('에러 처리 미들웨어로 감')
});

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});