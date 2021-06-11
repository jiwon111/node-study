const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});//응답에 대한 정보 기록
    res.write('<h1>Hello Node!</h1>');//클라이언트로 보낼 데이터
    res.end('<p>Hello Server!</p>');//응답을 종료하는 메서드
}).listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다');
});