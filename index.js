const http = require('http')
const socketIo = require('socket.io')
const server = http.createServer((req, res)=>{
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('serveur en fonctionnement');

})

const io = socketIo(server, {
	transports: ['websocket', 'polling'],
	cors: {
		origin: '*',
		methods: ["GET", "POST", "PUT", "DELETE"]
	}
});

io.on('connection', (socket) => {
	console.log('User connected to the server');
	console.log("User socket id : "+socket.id);

	socket.on('message', (message)=>{
		console.log("Received message from the client");
		console.log(message);
		try{
			const object = {
				'id': socket.id,
				'message': message
			}
			io.emit('message', object);
		}
		catch(err){
			console.log(err);
		}
		finally {
			console.log('Broadcasted message to every clients : ')
			console.log(io.sockets.sockets.size)
		}
	})

})

io.on('message', (message) => {
	console.log("Received message from the client");
})

server.listen(8080, ()=>{
	console.log('server is running')
});
