module.exports = {
    apps: [{
        name: "reddit-server",
        script: "env-cmd -f .env.production ts-node ./src/server.ts",
    }]
}