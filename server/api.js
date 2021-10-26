const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
client.connect();

// create account (PUT)

// login (POST)
app.post(/*login*/, async (req, res, next)
{

	var error = '';
	
	const {login, password} = req.body;
	const db = clinet.db();
	const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
		
	var id = -1;
	var fn = '';
	var ln = '';
	
	if (results.length > 0)
	{
		id = results[0].UserId;
		fn = results[0].FirstName;
		ln = results[0].LastName;
	}
	else
	{
		error = 'Invalid username/password';
	}
	
	var ret = {id:id, firstName:fn, lastName:ln, error:error};
	res.status(200).json(ret);
}

// edit account (PUT)

// get account info (GET)

// add friend (PUT)
app.post(/*add friend*/, async (req, res, next)
{
	var error = '';
	
	const {fid, uid} = req.body;
	const db = client.db();
	const check1 = await db.collection('Users').find({UserId:fid}).toArray();
	const check2 = await db.collection('Friends').find({FriendId:fid,UserId:uid}).toArray();
	
	const fname = '';
	
	if (check2.length > 0)
	{
		error = 'Friend is already added';
	}
	else if (check1.length > 0)
	{
		fname = check1.FirstName + check1.LastName;
		const isnert = db.collection('Friends').insertOne({FriendId:fid,UserId:uid});
	}
	else
	{
		error = 'Given friend does not exist';
	}
	
	var ret = {friendName:fname, error:error};
	res.status(200).json(ret);
}

// remove friend (DELETE)

// get friend info (GET)

// create party (PUT)

// join party (POST)

// invite to party (POST)

// remove from party (DELETE)

// add restaurant to party (POST)

// delete party (DELETE)

// leave party (DELETE)

// delete party (DELETE)

// temp restaurant list (POST/DELETE)

// search friends (GET)

// search restaurants (GET)

// search favorites (GET)

// add favorite restaurant (POST)
app.post(/*add favorite*/, async (req, res, next)
{
	var error = '';
	
	const {id, rname, address} = req.body;
	const db = client.db();
	const results = await db.collection(/*favrestaurants*/).find({UserID:id,Name:rname,Address:address}).toArray();
	
	if (results.length > 0)
	{
		error = 'Restaurant already in favorites";
	}
	else
	{
		const insert = db.collection(/*favrestaurants*/).insertOne({UserId:id,Name:rname,Address:address});
	}
	
	var ret = {error:error};
	res.status(200).json(ret);
}

