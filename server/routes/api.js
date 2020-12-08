const express = require("express")
const router = express.Router()
const axios = require("axios")
const User = require("../models/user")
const FavoriteStock = require("../models/favoriteStocks")


router.get('/sanity', (req, res) => {
	res.send('All good!')
})




module.exports = router