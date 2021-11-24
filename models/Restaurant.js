const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
	
	image_link: {
		type: String,
		maxLength: 300,
		trim: true
	},
	
	zip_code: {
		type: Number,
		minLength: 5,
		maxLength: 5,
		required: [true, 'restuarant must have zipcode]
	},
	
	name: {
		type: String,
		unique: true,
		required: [true, 'restaurant must have name']
	},
	
	// 5 star rating from google maps
	rating: {
		type: Number,
		min: 0.0,
		max: 5.0
	},
	
	// 3 dollar sign cost rating from google maps
	cost: {
		type: Number,
		min: 0,
		max: 3
		
	},
	
	style: {
		type: String,
		maxLength: 20,
		trim: true
	}
	
	desription: {
		type: String,
		maxLength: 300,
		trim: true
	}
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)
