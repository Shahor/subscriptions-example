function init() {
	return JSON.stringify({
		type: "connection_init",
	})
}

function noteCreated() {
	return JSON.stringify({
		id: 1,
		payload: {
			operationName: "onNoteCreation",
			query: `subscription onNoteCreation {
	noteCreated {
		...noteAttrs
	}
}

fragment noteAttrs on Note {
	id
	__typename
	createdAt
	createdBy
	updatedAt
	title
	channelId
	pinnedAt
	pinnedBy
	archivedAt
	activityCount
	lastActivityBy
	lastActivityAt
	lastActivityType
	publicShareToken
	publiclySharedAt
	publiclySharedBy
	collections
} `,
		},
		type: "start",
	})
}

module.exports = [init(), noteCreated()]
