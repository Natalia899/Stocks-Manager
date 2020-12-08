const manager = new StocksManager()
const render = new Renderer()

$('#submit').on('click', async () => {
    const username = $('#username').val()
    const password = $('#password').val()
    const userFavorites = await manager.logIn(username, password)
    console.log('what?');
    render.renderBoard()
    //window.location.href = "http:./dashboard.html"
   // location.href = "http:./dashboard.html"
    render.renderFavorites(manager.userFavorites)
})

$('#favorites-container').on('click', '.favorite', async function () {
    const stockName = $(this).text()
    let stockInfo = await  manager.getStockInfo(stockName)
    render.renderStockInfo(stockInfo) 
})

$('#board-container').on('click', '.search', async function() {
    console.log('hjjkjghgffg');
  const stockName = $(this).closest('.search-container').find('.stockSearch').val()
  console.log(stockName);
  let stockInfo = await  manager.getStockInfo(stockName)
  console.log(stockInfo);
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

$('#logout').on('click', function () {
    window.location.href = "http:./index.html"
})


// cancelled ?????compareFavorites button - call renderFavComp (userID) => render favCompare