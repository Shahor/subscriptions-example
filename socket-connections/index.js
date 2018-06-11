const process = require("process")

const connectionFactory = require("./connection-factory")
const { range } = require("./utils")
const messages = require("./messages")

let sockets = []

process.on("SIGINT", function handleSigInt() {
	console.log("closing sockets before leaving.")
	sockets.forEach(socket => {
		for (let id of range(0, 100)) {
			socket.send(JSON.stringify({ id, type: "stop" }))
		}

		socket.close()
	})
	setTimeout(function() {
		process.exit()
	}, 2000)
})

process.on("uncaughtException", function(error) {
	console.log(error)
	process.exit()
})

const numberOfSockets = process.argv[2] || 300

async function main() {
	sockets = await connectionFactory("ws://localhost:4000", numberOfSockets)

	sockets.forEach(socket => {
		messages.forEach(message => socket.send(message))
	})
}

main()
