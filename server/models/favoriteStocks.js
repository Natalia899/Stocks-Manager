const mongoose = require('mongoose')

const Schema = mongoose.Schema


const stockSchema = new Schema({
	userID: {type: Schema.Types.ObjectId, ref: 'User'},
	favorites: [{name: String}]
})

const FavoriteStock = mongoose.model("FavoriteStock", stockSchema)
module.exports = FavoriteStock