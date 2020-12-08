const manager = new StocksManager()
const render = new Renderer()

$('#submit').on('click', async () => {
    const username = $('#username').val()
    const password = $('#password').val()
    const userFavorites = await manager.logIn(username, password)
    window.location.href = "http:./dashboard.html"
    render.renderFavorites(userFavorites)
})

$('#favorites-container').on('click', '.favorite', async function () {
    const stockName = $(this).text()
    let stockInfo = await  manager.getStockInfo(stockName)
    render.renderStockInfo(stockInfo) 
})

$('#search').on('click', async function() {
  const stockName = $('#stockSearch').val()
  let stockInfo = await  manager.getStockInfo(stockName)
  render.renderStockInfo(stockInfo) 
})

$('#stockInfo-container').on('click', '.add', async function () {
    const stockName = $(this).     text()
    const userId = manager.userId
     manager.addFavorite(stockName, userId)
   
})

$('#favorites-container').on('click', '.remove', async function () {
    const stockName = $(this).closest('.favorite').text()
    const userId = manager.userId
    let data = await  manager.removeFavorite(stockName, userId)
    render.renderFavorites(manager.userFavorites) 
})


// cancelled ?????compareFavorites button - call renderFavComp (userID) => render favCompare