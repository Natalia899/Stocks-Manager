class StocksManager {
    constructor() {
        this.userFavorites = []
        this.userId = {}
        this.userName = ''
        this.stockData = {
            xAxis: [],
            yAxis: [],
        };

    }

    async logIn(userName, password) {
        let user = await $.get(`/login/${userName}/${password}`)
        this.userFavorites = user.favorites
        this.userId = user._id
        this.userName = user.username
        return this.userFavorites
    }

    async signUp(userName, passWord) {
      let newUser = await $.post(`/login/${userName}/${passWord}`)
      this.userName = userName
      this.userId = newUser._Id
      return newUser
    }

    async getChartInfo(stockName, time ) {
        let stockInfoForChart = await $.get(`/stock/${stockName}/${time}`)
        for (let i in stockInfoForChart.info) {
                    this.stockData.xAxis.unshift(stockInfoForChart.info[i].Date);
                    this.stockData.yAxis.unshift(stockInfoForChart.info[i].Price);
                }
                return this.stockData
    }
   

    async getStockInfo(stockName) {
        let stockGeneralInfo = await $.get(`/stockInfo/${stockName}`)
        return stockGeneralInfo
    }

    async addFavorite(stockName, userId) {
        let newFavorites = await $.ajax({
            url: `/stockAdd/${userId}/${stockName}`,
            type: 'PUT',
            success: function (result) {
                console.log(result);
            }
        })
        this.userFavorites = newFavorites
    }

    async removeFavorite(stockName, userId) {
        let newFavorites = await $.ajax({
            url: `/stockDel/${userId}/${stockName}`,
            type: 'PUT',
            success: function (result) {
            }
        })
        this.userFavorites = newFavorites
    }
}







