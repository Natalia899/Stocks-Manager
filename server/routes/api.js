const express = require("express")
const router = express.Router()
const axios = require("axios")
const bcrypt = require('bcrypt')
const User = require("../models/user")
const FavoriteStock = require("../models/favoriteStocks")

const apiKey = 'AN42IASXL414IVFG'



router.get('/sanity', (req, res) => {
	res.send('All good!')
})



router.get('/stock/:stockName', async (req, res) => {
	const { stockName } = req.params
	
	const stockSymbolSearch = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${apiKey}`)
	const stockSymbol =  await stockSymbolSearch.data.bestMatches[0][`1. symbol`]
	const stockApi = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stockSymbol}&apikey=${apiKey}&limit=12&offset=0`)
	const stockMonthly = await stockApi.data[`Monthly Time Series`]
	
	let months = {name: stockName, info: []}
	
	for(let i in stockMonthly){
		let monthlyClose  = { date: i, price: stockMonthly[i][`4. close`]}
		if(months.info.length < 12){
		months.info.push(monthlyClose)
	}
	}
	res.send(months)
})



router.get('/login/:userName/:passWord', async (req, res) =>{
	const { userName, passWord } = req.params
	
	const user = await User.find({ username: userName})
	
	const checkIfPasswordMatch = await bcrypt.compare(passWord, user[0].password, (err,result) => {
		if(result){
			const userId = user[0]._id
			const userFavorites = user[0].favorites;
			res.send({userId, userFavorites})
		}else{
			res.send('Password is incorrect')
		}
	})
})

module.exports = router