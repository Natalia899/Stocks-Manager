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

    renderStockInfo(stockInfo) {
        const source = $('#generalInfo-template').html()
        const template = Handlebars.compile(source)
        const someHTML = template( stockInfo )
        $('#generalInfo-container').empty().append(someHTML)
    }

    renderData(data, templateName, containerName){
        const source = $(`#${templateName}-template`).html()
        const template = Handlebars.compile(source)
        const someHTML = template(data)
        $(`#${containerName}-container`).empty().append(someHTML)
        
    }
}