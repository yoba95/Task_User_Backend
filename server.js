const express = require('express');
const bodyParser = require('body-parser');
const merhodOverride = require('method-override');
const session = require('express-session');
//TODO: importar la libreriA de socket.io
const socketio = require('socket.io');

const app = express();

const tasksRouter = require('./routes/task_routes.js');
const registrationsRoutes = require('./routes/registrations_routes.js');
const sessionsRoutes = require('./routes/sesions_routes.js');
const categoriesRoutes = require('./routes/categories_routes.js');

const findUserMiddleware = require('./middleware/find_user.js');
const authUserMiddleware = require('./middleware/auth_user.js');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(merhodOverride('_method'));
app.set('view engine', 'pug');

app.use(session({
    secret: ['15ssdsyyupg4gg5sdqhskjjwq','159dahgpwirencxm57ahap4spa'],
    saveUninitialized: false,
    resave: false
}));

app.use(findUserMiddleware);
app.use(authUserMiddleware);

app.use(tasksRouter);
app.use(registrationsRoutes);
app.use(sessionsRoutes);
app.use(categoriesRoutes);


app.get('/', function(req, res){
    res.render('home',{user: req.user});
})

let server = app.listen(4009);

//configuracion de sockey para conectarlo al http

let io = socketio(server);

let userCont = 0;
io.on('connection', function(socket){
    userCont++;

    io.emit('count_updated',{count: userCont});
    socket.on('disconnect', function(){
        userCont--;
        io.emit('count_updated',{count: userCont});
    })
});

const client = require('./realtime/client.js');