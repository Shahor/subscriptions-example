const { GraphQLServer } = require("graphql-yoga")
const { withFilter } = require("graphql-subscriptions")
const { RedisPubSub } = require("graphql-redis-subscriptions")

const CHANNEL = "noteCreated"

const pubsub = new RedisPubSub()

const typeDefs = `
	type Query {
		hello: String!
	}

	type Note {
		id: ID!
		createdAt: String!
		createdBy: ID!
		updatedAt: String!
		title: String!
		channelId: ID!
		organizationId: ID!
		pinnedAt: String
		pinnedBy: String
		archivedAt: String
		archivedBy: ID
		activityCount: Int
		lastActivityAt: String
		lastActivityBy: ID
		lastActivityType: String!
		collections: [ID!]!
		publicShareToken: String
		publiclySharedAt: String
		publiclySharedBy: String
	}

	type Subscription {
		noteCreated: Note
	}
`
const resolvers = {
    Subscription: {
        noteCreated: {
            subscribe: withFilter(
                function() {
                    return pubsub.asyncIterator(CHANNEL)
                },
                function filterFn() {
                    return true
                }
            ),
        },
    },
}
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } })

server.start(() => console.log("Server is running on localhost:4000"))
