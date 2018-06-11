const WebSocket = require("ws")
const { paginate } = require("./utils")
const chalk = require("chalk")

async function createConnection(host) {
	const socket = new WebSocket(host, "graphql-ws")
	return new Promise((resolve, reject) => {
		socket.on("close", function handleClose(code, reason) {
			reject({ code, reason })
		})

		socket.on("open", function handleOpen() {
			console.log("Connection established 👍")
			resolve(socket)
		})
	})
}

async function createSockets(host, slots, indexStart = 0) {
	const sockets = slots.map(async (_, index) => {
		const socket = await createConnection(host)
		socket.on("message", function handleMessage(payload) {
			const decoded = JSON.parse(payload)

			if (decoded.type !== "data") {
				return
			}

			const socketNumber = index + indexStart
			console.log(
				`[${chalk.blue(
					"socket " + socketNumber
				)}] message: ${chalk.white(payload)}`
			)
		})

		return socket
	})

	return await Promise.all(sockets)
}

module.exports = async function make(host, number) {
	const slots = Array(parseInt(number, 10)).fill(null)

	const PAGE_SIZE = 50
	const pages = paginate(PAGE_SIZE, slots)
	const sockets = await pages.reduce(async (previous, page, index) => {
		const list = await previous
		const newSockets = await createSockets(host, page, index * PAGE_SIZE)
		return list.concat(...newSockets)
	}, [])

	return sockets
}
