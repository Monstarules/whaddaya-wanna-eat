
const Party = require('../models/PartySchema')

// Create a Party (take in User id) 
const createParty = async (req, res) => {
    
    try {
        var code
        
        // Setup new Party
        const party = new Party ({
            code = generateCode()
        })
        
        // Push the User's ID into the party array
        party.User_IDs.push(req.params.id)
    
        // save party to database
        const newParty =  await party.save()
        res.status(201).json({partyCode: code, message: 'Party Created'})
    } catch (err) {
        res.status(500).json({message: 'Error'})
    }
}

// Delete Party (take in Party id) 
const deleteParty = async(req, res) => {
    try {
        await Party.findByIdAndDelete(req.params.partyid)
        res.status(200).json({message: 'Party deleted'})
    } catch (err) {
        res.status(500).json({message: 'Error'})
    }

}

// Join Party (take in party CODE & user id)   
const joinParty = async (req, res) => {
    
    const partyCode = req.params.code
    const userid = req.params.userid

    try {
        await Party.findOneAndUpdate({code: partyCode}, {$push: {User_IDs: userid} },{'new':true})
        res.status(200).json({message: 'Party Joined'})
    }
    catch (err) {
        res.status(500).json({message: 'Error'})
    }
}

// Leave Party (take in party id & user id)
const leaveParty = async (req, res) => {

    const partyid = req.params.partyid
    const userid = req.params.userid

    try {
        await Party.findByIdAndUpdate({_id: partyid}, {$pull: {User_IDs: userid} },{'new':true})
        res.status(200).json({message: 'Party Left'})
    }
    catch (err) {
        res.status(500).json({message: 'Error'})
    }
}

// Add to temp resturant list
const addList = async (req, res) => {

    const partyid = req.params.partyid
    const resturantName = req.body.resturantName

    try {
        await Party.findIdAndUpdate({_id: partyid}, {$push: {resturant_List: resturantName} },{'new':true})
        res.status(200).json({message: 'Resturant Added'})
    } catch (err) {
        res.status(500).json({message: 'Error'})
    }
}



function generateCode(){
	// all possible characters for codegen
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    
	// initialize return string
	var retval = ""
	
	// gives 10,000 tries at randomly generating unique code
	for(var i = 0; i<10000; i++){
		
		// loop creating a 6 char string
		for(j = 0; j<6; j++){
			var retval = retval + chars[Math.floor(Math.random()*36)]
		}
		
		// check to ensure code is unique
		var check = Party.findOne({code: retval})
		
		if(check === null){
			return retval
		}
	}
	
	// unable to generate unique code
	return null
}

module.exports = {
    createParty,
    deleteParty,
    joinParty,
    leaveParty,
    addList
}
