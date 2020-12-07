INTRO
    

PACKAGE REQUIREMENTS:    
   express
   handlebars
   jQuery
   mongoose
   request ?????
   materialize
   axios
   bcrypt

SERVER

  Express
  connection to  DB
  A server folder with a models and routes folder
  models folder should have a Users.js FavoriteStocks.js file
  Routes folder should have an api.js file, with an express Router setup

DB SCHEMAs

  DB schema in your Users.js file should have the following:
    name - a string
    password -(npm - bcrypt)!!!!!
    balance - a number
    
  DB schema in your FavoriteStocks.js file should have the following:
    userId: a number
    favorites: [{
    id:'',
    name:'',
    info:''
    }]

EXTERNAL API

  https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo
  key - 3TCIP7M1UFFYGITK 

  https://www.alphavantage.co/documentation/ - APIs are grouped into four categories: (1) Time Series Stock APIs, (2) Fundamental Data, (3) Physical and Digital/Crypto Currencies (e.g., Bitcoin), and (4) Technical Indicators. 
 !!!! find API for comparing

SERVER ROUTES
  
  A get route to /stock/:stocknName - This route should take a stockName parameter
 This will be the route that makes a call to external API and get [{ stockName:
                                                                                                   ?????????? what do we need????
                                                                      }]


  A get route to /login/:username/:userPassword - this route should take a username and UserPassword parameters and return all users favorites from DB or return error if 
                                                   user does not exist or password is not correct

  A post route to /stock/:stockName - This route should take stockName and user Id from the body, and push it to users favorites array on DB

  A put route to /stock/:userId/:stockId - this route should take the user's ID and stockId and remove the stock from favorites DB

  !!!Optional (need to find free API with statistics)----- A get route to /stoksComp - this route shoul make the api request to external api and return 10 stocks with the biggest market cap.




 FRONT ENT set up - dist folder: manager.js
                                 renderer.js
                                 main.js
                                 index.html ( login )
                                 dashboard.html
                                 style.css
    

MODEL (manager.js):

     constructor: favoriteStocks array of users favorites (empty) 

     getLogIn(username, password) - send GET request to /login/:username/:userPassword route and push favorites to favoriteStocks array 

     getstockInfo(stockName) - sends GET request to the /stock/:stockname route => send the res object to user

     addFavorite(stockName, userID) - sends POST request to the post route /stock/:userId/:stockName => push res to favoriteStocks array 

     removeFavorite(stockName, userID) - sends PUT request to /stock/:userId/:stockId => splice to favoriteStocks array

     
VIEW (Renderer.js):
    renderFavorites - receives user's favoriteStocks array and appends in html

    renderStockInfo - receives res object with stock info and appends it to html 

CONTROLLER (main.js)
    
   login submit button  -  should call getLogIn(username, password) 
                          redirect (https://stackoverflow.com/questions/37765444/how-to-redirect-to-a-html-page-from-a-javascript-snippet) or error

    
    onclick favorite - should call getstockInfo(stockName)=> render  stockInfo 

    serch button -  should call getstockInfo(stockName)=> render stockInfo
   
   saveAsFavorite button - call addFavorite(stockName, userID) => render favorites Array

    removeFromFavorites button - call removeFavorite(stockName, userID) => render favorites array

css

the end









!!!not important

// post /login/
getLogin(body:{username, password}) => {
    return   user: {id, name, info} : null
}

// get /stock/:user_id
getFavorites(user_id) => {
    return {
        user: {id, name, info},
        favorites: [{id, name, info}, ...]
    }
}


// register
register({username, password, balance}) => {
    return {
        user: {id, name, info},
        favorites: [{id, name, info}, ...]
    }
}

// get /statistics
getStatistics() => {
    return [
        {user, favorites.length}, ...
    ]
}

if ( login ) {
    redirect
    dashboard
        - search
        - add
        - anotherAction
        - show staticstics
} 
  

  clickOnlogin - > server check if login - > sends 1 of 2 options -> in client -> 'error' : user + data

FileSystem
1. connection to database
2. creating schemas
3. add user to database ( population database, dummy data of users to insert )
4. save favorites
5. get api
6. post1
7. post2
8. get1
9. put2


1. renderer
2. model
3. view
4. creating api calls
5. css ( LAST )