const mongoose = require('mongoose')

const Schema = mongoose.Schema


const stockSchema = new Schema({

})

const FavoriteStock = mongoose.model("FavoriteStock", stockSchema)
module.exports = FavoriteStock