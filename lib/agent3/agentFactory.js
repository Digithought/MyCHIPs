var consumer = require("./agents/consumer.js");
var defaultAgent = require("./agents/defaultAgent.js");

class AgentFactory {
    constructor(name, year) {
      this.name = name;
      this.year = year;
    };

    createAgent(type, params) {
        console.log("entering createAgent()")
        var agent;
    
        if (type === "Consumer") {
            agent = new consumer(params, worldDBManager, myChipsDBManager,
                checkForPeer, remoteCall, getAgentInfo, logger);
        }
        // Add other types here
    
        return agent;
    };

    createDefaultAgent() {
        return new defaultAgent();
    };
    
    // createCustomAgent(config) {
    //     return new agents(config);
    // }
}


