const express = require("express");
const hbs = require("express-handlebars");
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;


app.use(express.static(path.resolve("public")));

const users = {}

io.on('connection', socket => {
    console.log('Made socket working')

    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('disconnect', name => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })

    socket.on('send-message', message => {
        socket.broadcast.emit('their-chat-message', { message: message, name: users[socket.id] })
        socket.emit('own-chat-message', message);
    })

    socket.on('typing-message', name => {
        socket.broadcast.emit('someone-is-typing', name)
    })
});

// template engine
app.set("view engine", "hbs")
// Tell the views engine/ejs where the template files are stored (Settingname, value)
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
}))

app.get('/', function (req, res) {
    res.render('home.hbs')
})

http.listen(port, () => console.log(`Example app listening on port ${port}!`));