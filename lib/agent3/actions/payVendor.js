class PayVendor {
    #agentData
    #parameters
    #myChipsDBManager
    #getAgentInfo
    #logger
  
    constructor(agentData, parameters, myChipsDBManager, getAgentInfo, logger) {
      this.#agentData = agentData
      this.#parameters = parameters
      this.#myChipsDBManager = myChipsDBManager
      this.#getAgentInfo = getAgentInfo
      this.#logger = logger
    }
  
    shouldProcess() {
      return this.#agentData.foils > 0 && this.#agentData.units > this.#parameters.mintopay;
    };
  
    process() {
      let vendorIdx = Math.floor(Math.random() * this.#agentData.foils);
      let vendorId = this.#agentData.vendors[vendorIdx];
      let vendorData = this.#getAgentInfo(vendorId);
  
      if (vendorData) {
        this.#logger.debug("  I:", this.#agentData.id, "; Pay a vendor", vendorIdx, 'of', 
        this.#agentData.vendors.length, vendorId, "NW:", this.#agentData.units);
  
        // Ask the MyCHIPsDB to make the payment
        this.#myChipsDBManager.payVendor(this.#agentData, vendorIdx, vendorData);
        // I think the AgentCluster is listening to the MyCHIPsDB, so when this change is made,
        // it detects the change and updates the WorldDB accordingly.
        /* This is what the SQLDB facade should implement (SHOULD BE MOVED TO OTHER CLASS!)
        let guid = uuidv4()
        , sig = "Valid"
        , max = Math.max(agentData.units * this.parms.maxtopay, 1000)		//Pay 1 CHIP or % of net worth
        , units = Math.floor(Math.random() * max)
        , seq = agentData.foil_seqs[vendorIdx]			//Tally sequence
        , quid = 'Inv' + Math.floor(Math.random() * 1000)
        , req = 'userDraft'
        , sql = "insert into mychips.chits_v (chit_ent,chit_seq,chit_guid,chit_type,signature,units,quidpro,request) values ($1,$2,$3,'tran',$4,$5,$6,$7)"
  
        this.log.verbose("  payVendor:", agentData.id, "->", vendorData.id, "on:", seq, "Units:", units)
        this.sqlDB.query(sql, [agentData.id,seq,guid,sig,units,quid,req], (e,r) => {
          if (e) {this.log.error('In payment:', e.stack); return}
          this.log.debug("  payment:", agentData.id, agentData.std_name, "to:", vendorData.id, vendorData.std_name)
        })
        // End of stuff to move to DB manager */
      }
    };
}