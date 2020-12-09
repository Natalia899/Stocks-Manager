class StocksManager {
    constructor() {
        this.userFavorites = []
        this.userId = {}
        this.userName = ''
    }

    async logIn(userName, password) {
        let user = await $.get(`/login/${userName}/${password}`)
        console.log(user);
        this.userFavorites = user.favorites
        this.userId = user._id
        this.userName = user.username
        return this.userFavorites
    }

    async signUp(userName, passWord) {
      let newUser = await $.post(`/login/${userName}/${passWord}`)
      console.log(newUser);
      this.userName = userName
      this.userId = newUser._Id
      return newUser
    }

    async getChartInfo(stockName) {
        let stockInfoForChart = await $.get(`/stock/${stockName}`)
        return stockInfoForChart
    }

    async getStockInfo(stockName) {
        let stockGeneralInfo = await $.get(`/stockInfo/${stockName}`)
        console.log(stockGeneralInfo);
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

    // async compareFavorites(userId) {
    //     let compStocks = await $.get(`/stocksComp/${userId}`)
    //     return compStocks

    // }
}