const IoRedis = require("ioredis")
const process = require("process")

const Pubsub = new IoRedis() // localhost, 6379

async function wait(ms) {
	return new Promise(resolve => {
		console.log(`waiting ${ms} before next data push`)
		setTimeout(resolve, ms)
	})
}

async function sendMessage() {
	await Pubsub.publish(
		"noteCreated",
		JSON.stringify({
			noteCreated: {
				createdAt: "2018-06-04T12:32:00.762Z",
				updatedAt: "2018-06-04T12:32:00.763Z",
				lastActivityAt: "2018-06-04T12:32:00.762Z",
				lastActivityType: "content",
				activityCount: 0,
				id: "nBvEPeScmU",
				title: "",
				createdBy: "HJxWBAdpy7",
				channelId: "93mVp9BDto",
				organizationId: "HJZBRuTkQ",
				publicShareToken: "AvUYQDtXo1T1zhSDzPnZkT",
				archivedBy: null,
				archivedAt: null,
				pinnedAt: null,
				lastActivityBy: null,
				pinnedBy: null,
				publiclySharedAt: null,
				publiclySharedBy: null,
				collections: [],
			},
		})
	)
}

function computeNumberAndWaitTime(numberOfMessagesPerMinute) {
	return {
		number: numberOfMessagesPerMinute,
		interval: 60e3 /* one minute in ms */ / numberOfMessagesPerMinute,
	}
}

const RATE = process.argv[2] || 200

async function main() {
	const { number, interval } = computeNumberAndWaitTime(RATE)

	for (let i = 0; i < number; i++) {
		console.log(`Pushing message number ${i + 1}`)

		await sendMessage()
		if (i + 1 === number) {
			break
		}

		await wait(interval)
	}
	process.exit(0)
}
main()
