class Renderer {
    renderBoard(){
        const source = $('#board-template').html()
        const template = Handlebars.compile(source)
       // const data = template({favoriteStocks})
        $('#login-container').empty()
        $('#board-container').append(template)
    }
    renderFavorites(favoriteStocks) {
        console.log('do u render?');
        const source = $('#stock-template').html()
        const template = Handlebars.compile(source)
        const data = template({favoriteStocks})
        $('#favorites-container').empty().append(data)
    } 

    renderStockInfo(stockInfo) {
        const source = $('#name-template').html()
        const template = Handlebars.compile(source)
        const data = template({stockInfo})
        $('#stockInfo-container').empty().append(data)
//- receives res object with stock info and appends it to html (graph)
    } 

    renderFavComp(favoritesCompare) {
//- receives array with favorites names and close prices and appends it to html (graph)
    } 

}