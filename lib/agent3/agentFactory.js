const Agent = require("./agent");

module.exports = {
    createAgent(type) {
        var agent;

        if (type === "Consumer") {
            agent = new Agent({type:"Consumer"});
        }

        return agent;
    },

    createCustomAgent(config) {
        return new Agent(config);
    }
}