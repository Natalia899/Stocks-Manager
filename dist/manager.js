class StocksManager {
    constructor() {
        this.userFavorites = []
    }

   async logIn(userName, password){
       let userFavoritesDb = await $.get(`/login/${userName}/${password}`)
       this.userFavorites = userFavoritesDb
    }

   async  getStockInfo(stockName) {
       let stockInfo = await $.get(`/stock/${stockName}`)
       return stockInfo

    }

  async addFavorite(stockName, userId) {
        let newFavorites = await $.ajax({
            url: `/stockAdd/${userId}/${stockName}`,
            type: 'PUT',
            success: function (result ) {
                console.log(result);
            }
        }) 

        this.userFavorites = newFavorites
    }

  async removeFavorite(stockName, userId) {
    let newFavorites = await $.ajax({
        url: `/stockDel/${userId}/${stockName}`,
        type: 'PUT',
        success: function (result ) {
            console.log(result);
        }
    }) 

    this.userFavorites = newFavorites  
    }

   async compareFavorites(userId) {
       let compStocks = await $.get(`/stocksComp/${userId}`)
       return compStocks

    }
}