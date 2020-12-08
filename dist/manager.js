class StocksManager {
    constructor() {
        this.userFavorites = []
        this.userId = {}
    }

   async logIn(userName, password){
       console.log('here?');
      let userFavoritesDb = await $.get(`/login/${userName}/${password}`)
      console.log(userFavoritesDb[0].favorites);
       this.userFavorites = userFavoritesDb[0].favorites
       console.log(this.userFavorites);
      this.userId = userFavoritesDb[0]._id
        
    }

   async  getStockInfo(stockName) {
       let stockInfo = await $.get(`/stock/${stockName}`)
       console.log('manager');
       console.log(stockInfo);
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