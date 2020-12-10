const manager = new StocksManager()
const renderm = new Renderer()
const chart = chartSetup()


$('#submit').on('click', async () => {
    const username = $('#username').val()
    const password = $('#password').val()
    const user = await manager.logIn(username, password)
    if (user) {
        renderm.renderBoard()
        renderm.renderData({favoriteStocks :manager.userFavorites}, 'stock', 'favorites')
    } else {
        renderm.renderError()
    }
})

$('#signUp').on('click', async () => {
    const username = $('#username').val()
    const password = $('#password').val()
    const newUser = await manager.signUp(username, password)
    console.log(newUser);
    renderm.renderBoard()

})

$('#favorites-container').on('click', '.favoriteName', async function () {
    const stockName = $(this).text()
    console.log(stockName);
    const time = 'weekly'
    let chartInfo = await manager.getChartInfo(stockName, time)
    let generalInfo = await manager.getStockInfo(stockName)
    renderm.renderData(generalInfo, 'generalInfo', 'generalInfo')
    chart.appendReleventElements("#chart-container");
    await chart.renderChart(stockName, manager.stockData.yAxis, manager.stockData.xAxis)
})

$('#board-container').on('click', '.search', async function () {
    const stockName = $(this).closest('.search-container').find('.stockSearch').val()
    const time = 'weekly'
    let chartInfo = await manager.getChartInfo(stockName, time)
    let generalInfo = await manager.getStockInfo(stockName)
    renderm.renderData(generalInfo, 'generalInfo', 'generalInfo')
    chart.appendReleventElements("#chart-container");
    await chart.renderChart(stockName, manager.stockData.yAxis, manager.stockData.xAxis);
})
    

$('#generalInfo-container').on('click', '.addToFavorites', async function () {
    console.log('add main');
    const stockName = $('.search-container').find('.stockSearch').val()
    console.log('do u add?');
    const userId = manager.userId
    await manager.addFavorite(stockName, userId)
    renderm.renderData({favoriteStocks :manager.userFavorites}, 'stock', 'favorites')

})

$('#favorites-container').on('click', '.remove', async function () {
    const stockName = $(this).closest('.favorite').find('.favoriteName').text()
    console.log(stockName);
    const userId = manager.userId
    let data = await manager.removeFavorite(stockName, userId)
    renderm.renderData({favoriteStocks :manager.userFavorites}, 'stock', 'favorites')
})


