const express = require('express')
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./user.js');
var cors = require('cors');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

var port = process.env.PORT || 3001;
const route = require('./routes.js');

app.get('/', (req, res) => {
    console.log('GET \'/\' url!!')
    res.send('Hello World!');
})
app.get('/users', (req,res) => {
    
    User.find({}, (err,users)=>{
        if(err){console.log(err)}
        console.log(users);
        res.json({result:true, users: users});
    })
})
// const mongodbUri = 'mongodb://bhkim963:bh635241!@bh-shard-00-00-ydxsf.mongodb.net:27017';
const mongodbUri = 'mongodb://localhost:27017'
mongoose.connect(mongodbUri, {
    // useMongoClient: true
    // useNewUrlParser: true
});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to mongod server..');
})
// db.on('disconnect', connect);

server = app.listen(port, function() {
    console.log('server is running on port '+port);
});

const io = require('socket.io')(server);
io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data)
        console.log(data);
    });
});

