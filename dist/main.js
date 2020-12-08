const manager = new StocksManager()
const render = new Renderer()

$('#submit').on('click', async () => {
    const username = $('#username').val()
    const password = $('#password').val()
    const userFavorites = await manager.login(username,password)
    window.location.href = "http:./dashboard.html"
    render.renderFavorites(userFavorites)
})




// login submit button  -  should call getLogIn(username, password) 
// redirect (https://stackoverflow.com/questions/37765444/how-to-redirect-to-a-html-page-from-a-javascript-snippet) or error


// onclick favorite - should call getstockInfo(stockName)=> render  stockInfo 

// serch button -  should call getstockInfo(stockName)=> render stockInfo

// saveAsFavorite button - call addFavorite(stockName, userID) => render favorites Array

// removeFromFavorites button - call removeFavorite(stockName, userID) => render favorites array

// compareFavorites button - call renderFavComp (userID) => render favCompare