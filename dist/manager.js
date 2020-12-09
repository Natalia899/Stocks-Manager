class StocksManager {
    constructor() {
        this.userFavorites = []
        this.userId = ''
        this.userName = ''
    }

    async logIn(userName, password) {
        let userFavoritesDb = await $.get(`/login/${userName}/${password}`)
        console.log(userFavoritesDb);
        this.userFavorites = userFavoritesDb.userFavorites
        this.userId = userFavoritesDb.userId
        this.userName = userName
        return this.userFavorites
    }

    async signUp(userName, passWord) {
      let newUser = await $.post(`/login/${userName}/${passWord}`)
      console.log(newUser);
      this.userName = userName
      this.userId = newUser._Id
      return newUser
    }

    async getStockInfo(stockName) {
        let stockInfo = await $.get(`/stock/${stockName}`)
        console.log(stockInfo);
        let x = stockInfo.info.map(el => el.date)
        let y = stockInfo.info.map(el => el.price)
        console.log(y)
        return {
            dates: x,
            prices: y
        }
    }

    async addFavorite(stockName, userId) {
        console.log('i  am manager')
      
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