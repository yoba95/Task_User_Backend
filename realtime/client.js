const io =  require('socket.io-client');

let socket = io.connect('http://localhost:4009', {reconnect: true});

socket.on('connect', function(){
    console.log("\n\nScokect connected fron NodejJS\n\n")
})

module.exports = socket;