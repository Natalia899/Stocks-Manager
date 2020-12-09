const express = require("express")
const router = express.Router()
const axios = require("axios")
const bcrypt = require('bcrypt')
const yahooFinance = require('yahoo-finance');
const User = require("../models/user")
const FavoriteStock = require("../models/favoriteStocks")


const apiKey = 'AN42IASXL414IVFG'


// First get stock info-sends monthly closed price of past year => get stock info by time series\\
router.get('/stock/:stockName', async (req, res) => {
	const { stockName } = req.params
	const stockSymbolSearch = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${apiKey}`)
	const stockSymbol = await stockSymbolSearch.data.bestMatches[0][`1. symbol`]
	const companyName = await stockSymbolSearch.data.bestMatches[0][`2. name`]
	const stockApi = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stockSymbol}&apikey=${apiKey}&limit=12&offset=0`)
	const stockMonthly = await stockApi.data[`Monthly Time Series`]
	let months = { Name: companyName, info: [] }
	for (let i in stockMonthly) {
		let monthlyClose = { date: i, price: stockMonthly[i][`4. close`] }
		if (months.info.length < 12) {
			months.info.push(monthlyClose)
		}
	}
	res.send(months)
})

router.get('/stockInfo/:stockName', async (req, res) => {
	const { stockName } = req.params
	const stockSymbolSearch = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${apiKey}`)
	const stockSymbol = await stockSymbolSearch.data.bestMatches[0][`1. symbol`]
	const companyName = await stockSymbolSearch.data.bestMatches[0][`2. name`]
	
	await yahooFinance.quote({
		symbol: stockSymbol,
		modules: ['recommendationTrend', 'summaryDetail', 'earnings','summaryProfile', 'earnings'],
	}, function(err, quote) {
		
			const marketCap = quote.summaryDetail.marketCap

			const analystsReco3months = quote.recommendationTrend.trend[3]

			const quarterEstimate = {
				"Quarter Estimate": quote.earnings.earningsChart.currentQuarterEstimate,
				"Estimate Date": quote.earnings.earningsChart.currentQuarterEstimateDate,
				"Estimate Year": quote.earnings.earningsChart.currentQuarterEstimateYear
			}
	
			const dividend = {
				"dividend yield": "0%",
				"ex dividend date": "0%" 
			}
			if(quote.summaryDetail.dividendYield && quote.summaryDetail.exDividendDate != null){
				dividend[`dividend yield`] = quote.summaryDetail.dividendYield
				dividend[`ex dividend date`] = quote.summaryDetail.exDividendDate
			}
			
			const dataPrice = {
				"current price": quote.summaryDetail.previousClose,
				"52 weeks low": quote.summaryDetail.fiftyTwoWeekLow,
				"52 weeks high": quote.summaryDetail.fiftyTwoWeekHigh
			}
			
			const earnings = quote.earnings.financialsChart.quarterly[3]

			const companyDetails = {
				"city": quote.summaryProfile.city,
				"state": quote.summaryProfile.state,
				"country": quote.summaryProfile.country,
				"phone": quote.summaryProfile.phone,
				"website": quote.summaryProfile.website,
				"industry": quote.summaryProfile.industry,
				"sector": quote.summaryProfile.sector,
				"full Time Employees": quote.summaryProfile.fullTimeEmployees
			}
		res.send([companyName, stockSymbol, marketCap, analystsReco3months, quarterEstimate, dividend, dataPrice, earnings, companyDetails])
	})
})

router.get('/login/:userName/:passWord', async (req, res) => {
	const { userName, passWord } = req.params
	const user = await User.find({ username: userName })
	const checkIfPasswordMatch = await bcrypt.compare(passWord, user[0].password, (err, result) => {
		if (result) {
			res.send(user[0])
		} else {
			res.send('Password is incorrect')
		}
	})
})

router.post('/login/:userName/:passWord', async (req, res) => {
	const { userName, passWord } = req.params

	const user = new User({
		username: userName,
		password: passWord,
	})
	const saveUser = await user.save()
	console.log(saveUser);
	res.send(saveUser)
})

router.put('/stockAdd/:userId/:stockName', async (req, res) => {
	console.log('put server');
	const { userId, stockName } = req.params
	const userID = User.findById({ _id: userId }, (err, user) => {
		user.favorites.push(stockName)
		user.save()
		res.send(user.favorites)
	})
})

router.put('/stockDel/:userId/:stockName', (req, res) => {
	const { userId, stockName } = req.params
	console.log('put server');
	const userID = User.findById({ _id: userId }, (err, user) => {
		const favArr = user.favorites.indexOf(stockName)
		user.favorites.splice(favArr, 1)
		user.save()
		res.send(user.favorites)
	})
})

module.exports = router