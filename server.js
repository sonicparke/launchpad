var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();


app.use('/', express.static('./app'));
//app.use('/', express.static('./build/'));

app.get('*', function(req, res){
    res.render('index.html');
})


//switch (env){
//    case 'build':
//        console.log('** BUILD **');
//        console.log('serving from ' + './build/');
//        app.use('/', express.static('./build/'));
//        break;
//    default:
//        console.log('** DEV **');
//        console.log('serving from ' + './app/');
//        app.use('/', express.static('./app'));
//        break;
//}

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...' );