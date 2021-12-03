var makeNewTally = require("./actions/makeNewTally.js")
var payVendor = require("./actions/payVendor.js")

class actionFactory {

  createAction(type, agentData, parameters, worldDBManager, myChipsDBManager,
    checkForPeer, remoteCall, getAgentInfo, logger) {
    var action;
  
    if (type === "makeNewTally") {
      action = new makeNewTally(agentData, parameters, worldDBManager, myChipsDBManager,
        checkForPeer, remoteCall, logger);
    }
    else if (type == "payVendor") {
      action = new payVendor(agentData, parameters, myChipsDBManager, getAgentInfo, logger);
    }
    // Add more types here...
    return action;
  } 
  
  createStandardActions(agentData, parameters, worldDBManager, myChipsDBManager, checkForPeer,
    remoteCall, getAgentInfo, logger) {
    var actions = [];
  
    actions.push(new makeNewTally(agentData, parameters, worldDBManager, myChipsDBManager,
      checkForPeer, remoteCall, logger));
    actions.push(new payVendor(agentData, parameters, myChipsDBManager, getAgentInfo, logger));
    // Add more standard types here...
    return actions;
  }
} 
