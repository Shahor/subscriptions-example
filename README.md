# Server

The graphql subscriptions server.
It can be launched directly on your machine:

```bash
$ /server > node index.js
```

Or with docker

```bash
$ /server > docker-compose up
# Port 4000 will be exposed to access the server locally, as well as 9002 for chrome dev tools
```

You need to have a running redis server.
You can modify the host in the `index.js` file directly.

# Socket connections

This will make socket connections to the previously launched server.

Just run it directly. You can pass it a first argument that would be the number of connections to make (300 by default)

# Publisher

This will publish events in the redis pubsub system.

You can launch it directly, or specify a rate of events per minute as a first argument (200 by default)
