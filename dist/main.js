
const manager = new StocksManager()
const renderm = new Renderer()
//const chart = chartSetup()


$('#submit').on('click', async () => {
    const username = $('#username').val()
    const password = $('#password').val()
    const user = await manager.logIn(username, password)
    if (user) {
        renderm.renderBoard()
        renderm.renderFavorites(manager.userFavorites)
    } else {
        renderm.renderError()
    }
})

$('#signUp').on('click', async () => {
    console.log('doooo');
    const username = $('#username').val()
    const password = $('#password').val()
    const newUser = await manager.signUp(username, password)
    console.log(newUser);
    renderm.renderBoard()

})

$('#favorites-container').on('click', '.favoriteName', async function () {
    const stockName = $(this).text()
    console.log(stockName);
    let stockInfo = await manager.getStockInfo(stockName)
    renderm.renderStockInfo(stockInfo)
})

$('#board-container').on('click', '.search', async function () {
    const stockName = $(this).closest('.search-container').find('.stockSearch').val()
    let chartInfo = await manager.getChartInfo(stockName)
    let generalInfo = await manager.getStockInfo(stockName)
    console.log(chartInfo);
    console.log(generalInfo);
    //renderStockInfo(generalInfo)
    
    // chart.appendReleventElements("#chart-container")
    // chart.renderChart(stockName, stockInfo.prices, stockInfo.dates)
   // render.renderStockInfo(stockInfo)
})

$('#stockInfo-container').on('click', '.add', async function () {
    console.log('add main');
    const stockName = $(this).closest('#stockInfo-container').find('.name').text()
    const userId = manager.userId
    await manager.addFavorite(stockName, userId)
    render.renderFavorites(manager.userFavorites)

})

$('#favorites-container').on('click', '.remove', async function () {
    const stockName = $(this).closest('.favorite').find('.favoriteName').text()
    console.log(stockName);
    const userId = manager.userId
    let data = await manager.removeFavorite(stockName, userId)
    render.renderFavorites(manager.userFavorites)
})


