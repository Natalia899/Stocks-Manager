class Renderer {
    renderBoard() {
        const source = $('#board-template').html()
        const template = Handlebars.compile(source)
        $('#login-container').empty()
        $('#board-container').append(template)
    }

    renderError() {
        $('#board-container').append("<p class='error'>Username or password is not correct.Please try again</p>")
    }

    renderFavorites(favoriteStocks) {
        const source = $('#stock-template').html()
        const template = Handlebars.compile(source)
        const data = template({ favoriteStocks })
        $('#favorites-container').empty().append(data)
    }
    
    renderStockInfo(stockInfo) {
        const source = $('#generalInfo-template').html()
        const template = Handlebars.compile(source)
        const data = template({ stockInfo })
        $('#generalInfo-container').empty().append(data)
    }




}