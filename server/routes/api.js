const express = require("express")
const router = express.Router()
const axios = require("axios")
const User = require("../models/user")
const FavoriteStock = require("../models/favoriteStocks")

const apiKey = 'AN42IASXL414IVFG'

router.get('/sanity', (req, res) => {
	res.send('All good!')
})


// router.get('/login/:userName/:password', async (req, res) =>{
// 	const { userName, password } = req.params
	
// 	const user = await User.find({ username: userName},{_id: 1})
// 	// console.log(user);
// 	let testFav = new FavoriteStock({
// 		UserID: user.
// 		favorites: []
// 	})
		
// 	testFav.save()
	
	
// })

router.get('/stock/:stockName', async (req, res) => {
	const { stockName } = req.params

	const stockSymbolSearch = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${apiKey}`)
	const stockSymbol =  await stockSymbolSearch.data.bestMatches[0][`1. symbol`]
	const stockApi = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stockSymbol}&apikey=${apiKey}&limit=12&offset=0`)
	const stockMonthly = await stockApi.data[`Monthly Time Series`]
	
	let months = []
	for(let i in stockMonthly){
		let monthlyClose  = { date: i, price: stockMonthly[i][`4. close`]}
		if(months.length < 12){
		months.push(monthlyClose)
		}
	}
	res.send(months)
})


module.exports = router