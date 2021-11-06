
const User = require('../models/User')

// get account info (take in userid)
const getUser = async (req, res) =>{

	try{
		const user = await User.findById(req.params.userid)
		res.status(200).json(user)
	} catch(err) {
		res.status(500).json({message: 'Error'})
	}
}

// add friend (take in user id and friend's user id)
const addFriend = async (req, res) =>{
	
	const userid = req.params.userid
	const fid = req.params.fid
	
	try{
		const user = await User.findById(fid)
		
		if (user.length === 0) {
			return res.status(404).json({ msg: 'user does not exist' })
		}
		
		await User.findOneAndUpdate({_id: userid},  {$push: {friends: fid}},{'new':true})
		
		// adds your id into friend's friends list, assuming mutual agreement for adding
		await User.findOneAndUpdate({_id: fid}, {$push: {friends: userid}}, {'new':true})
		
		res.status(200).json({message: 'Friend Added'})
		} catch (err) {
			res.status(500).json({message: 'Error'})
		}
}

// remove friend (take in user id and friend's user id)
const removeFriend = async (req, res) =>{
	
	const userid = req.params.userid
	const fid = req.params.fid
	
	try{
		await User.findOneAndUpdate({_id: userid}, {$pull: {friends: fid}},{'new':true})
		await User.findOneAndUpdate({_id: fid}, {$pull: {friends: userid}},{'new':true})
		res.status(200).json({message: 'Friend Removed'})
	} catch (err) {
		res.staus(500).json({message: 'Error'})
	}
}
// get friends (take in user id)
const getFriends = async (req, res) =>{
	
	var ret = []
	
	try{
		const user = User.findById(req.params.userid)
		
		for (let i = 0; i < user.friends.length; i++) {
			const friend = await User.findById(user.friends[i])
			ret.push(friend)
		}
		
		res.status(200).json(JSON.stringify(ret))
		} catch (err) {
			res.status(500).json({message: 'Error'})
		}
	}
}

module.exports = {
	getUser,
	addFriend,
	removeFriend,
	getFriends
}
