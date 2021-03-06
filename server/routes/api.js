const express = require("express")
const router = express.Router()
const axios = require("axios")
const bcrypt = require('bcrypt')
const yahooFinance = require('yahoo-finance');
const User = require("../models/user")
const apiKey = 'AN42IASXL414IVFG'


const urlStockSymbol = function (stockName, apiKey) {
	return `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${apiKey}`
}

const urlStockApi = function (timeSeries, stockSymbol, apiKey)  {
	return `https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeries}&symbol=${stockSymbol}&apikey=${apiKey}`
}


router.get('/stock/:stockName/:timeSeries', async (req, res) => {
	const { stockName, timeSeries } = req.params
	const stockSymbolSearch = await axios.get(urlStockSymbol(stockName, apiKey))
	const stockSymbol = await stockSymbolSearch.data.bestMatches[0][`1. symbol`]
	const companyName = await stockSymbolSearch.data.bestMatches[0][`2. name`]
	const stockApi = await axios.get(urlStockApi(timeSeries, stockSymbol, apiKey))

	const stockDaily = await stockApi.data[`Time Series (Daily)`]
	const days = { Name: companyName, Symbol: stockSymbol, info: [] }

	const stockWeekly = await stockApi.data[`Weekly Time Series`]
	const weeks = { Name: companyName, Symbol: stockSymbol, info: [] }

	const stockMonthly = await stockApi.data[`Monthly Time Series`]
	const months = { Name: companyName, Symbol: stockSymbol, info: [] }

	const timeSeriesFun = function (statment, stockTime, timeClose, num, time) {
		try {
			if (timeSeries == statment) {
				for (let i in stockTime) {
					timeClose = { Date: i, Price: stockTime[i][`4. close`] }
					if (time.info.length < num) {
						time.info.push(timeClose)
					}
				}
				res.status(200).json(time)
			}
		} catch (err) {
			res.status(404).json(err)
		}
	}
	timeSeriesFun("daily", stockDaily, 'dailyClose', 5, days)
	timeSeriesFun('weekly', stockWeekly, 'weeklyClose', 4, weeks)
	timeSeriesFun('monthly', stockMonthly, 'monthlyClose', 12, months)
})

router.get('/stockInfo/:stockName', async (req, res) => {
	const { stockName } = req.params
	const stockSymbolSearch = await axios.get(urlStockSymbol(stockName, apiKey))
	const stockSymbol = await stockSymbolSearch.data.bestMatches[0][`1. symbol`]
	const companyName = await stockSymbolSearch.data.bestMatches[0][`2. name`]
	
	await yahooFinance.quote({
		symbol: stockSymbol,
		modules: ['recommendationTrend', 'summaryDetail', 'earnings','summaryProfile', 'earnings'],
	}, function(err, quote) {
		
			const marketCap = quote.summaryDetail.marketCap

			const analystsReco3months = quote.recommendationTrend.trend[3]

			const quarterEstimate = {
				"quarter Estimate": quote.earnings.earningsChart.currentQuarterEstimate,
				"estimate Date": quote.earnings.earningsChart.currentQuarterEstimateDate,
				"estimate Year": quote.earnings.earningsChart.currentQuarterEstimateYear
			}
	
			const dividend = {
				"dividendYield": quote.summaryDetail.dividendYield || 0,
				"exDividendDate": quote.summaryDetail.exDividendDate || 0
			}
			
			const dataPrice = {
				"currentPrice": quote.summaryDetail.previousClose,
				"52WeeksLow": quote.summaryDetail.fiftyTwoWeekLow,
				"52WeeksHigh": quote.summaryDetail.fiftyTwoWeekHigh
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
				"fullTimeEmployees": quote.summaryProfile.fullTimeEmployees
			}
		res.send({companyName, stockSymbol, marketCap, analystsReco3months, quarterEstimate, dividend, dataPrice, earnings, companyDetails})
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