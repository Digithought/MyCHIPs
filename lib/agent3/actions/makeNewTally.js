class MakeNewTally {
    #agentData
    #parameters
    #worldDBManager
    #myChipsDBManager
    #checkForPeer
    #remoteCall
    #logger
  
    constructor(agentData, parameters, worldDBManager, myChipsDBManager, checkForPeer, remoteCall, logger) {
      this.#agentData = agentData
      this.#parameters = parameters
      this.#worldDBManager = worldDBManager
      this.#myChipsDBManager = myChipsDBManager
      this.#checkForPeer = checkForPeer
      this.#remoteCall = remoteCall
      this.#logger = logger
  
      this.tryTally = this.tryTally.bind(this)
    }
  
    shouldProcess() {
      return this.#agentData.stocks <= 0 || // If the agent has no stocks   or
        (this.#agentData.stocks < this.#parameters.maxstocks && // (if the agent doesn't have too many stocks and
          Math.random() < this.#parameters.addclient); //  we randgomly choose to)
    };
  
    process() {
      //FIXME: This stuff should be put in the MongoDB Facade!
      this.#worldDBManager.findPeerAndUpdate(this.#agentData, this.#parameters, this.tryTally);
  
      /* This is the method that the facade will call on MongoDB (SHOULD BE MOVED TO OTHER CLASS!)
      agentCollection.findOneAndUpdate(     // Look for a new trading partner
        {   // Filter Options
          peer_cid: {
            $ne: agentData.peer_cid,				// Don't find myself
            $nin: agentData.partners				// or anyone I'm already connected to
          },
          foils: {
            $lte: parameters.maxfoils       // Don't find others with too many foils already
          }
        },
        {   // Update Operations
          $set: {random: Math.random()},	  // Re-randomize this agent
          $inc: {foils: 1},				          // Update how many foils they have
          $push: {partners: agentData.peer_cid}	// Immediately add ourselves to their peer array to avoid double connecting
        },
        {   // Optional Settings
          sort: {
            foils: 1,                       // Sort by number of foils
            random: -1                      // and random value
          }
        },
        (err, res) => {   // Callback Function
          if (err) {
            logger.error(err.errmsg)
          } else if (res.ok) {
            tryTally(agentData, res.value)
          } else {
            logger.verbose("  No peer found in World DB")
          }
        }
      )
      // ---- End Stuff to put in MongoDB Manager */
    };
}