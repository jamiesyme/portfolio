import Express from 'express';

const app = Express();

app.use('/f', Express.static('../client/public'));
app.use('/img', Express.static('../client/public/img'));

app.get('/f/bundle.js', function (request, response) {
    response.sendFile('bundle.js', {
        root: __dirname
    });
});

app.get('/', function (request, response) {
    response.sendFile('index.html', {
        root: __dirname + '/../client/public'
    });
});

app.listen(8080);
