const express = require('express');
const bodyParser = require('body-parser');

const cors = require ("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config();


// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 4001;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Apply CORS middleware 
app.use(
  cors({
      origin: ["*"], //["http://localhost:3000","http://localhost:3001"],
      method: ["GET", "POST"],
      credentials : true,
  })
);


// Serve files from a directory (e.g., 'public')
app.use(express.static('public'));



// define a root route



// Require [user] routes
const userRoutes = require('./src/routes/user.routes')
const orderRoutes = require('./src/routes/order.routes')
const orderFoodRoutes = require('./src/routes/order_food.routes')
const menuRoutes = require('./src/routes/menu.routes')
const mealPlanRoutes = require('./src/routes/mealplan.routes')
const planHistoryRoutes = require('./src/routes/planhistory.routes')
const viewsRoutes = require('./src/routes/views.routes')

app.use(cookieParser());

// using as middleware
app.use('/', viewsRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/orderfood', orderFoodRoutes)
app.use('/api/menus', menuRoutes)
app.use('/api/plans', mealPlanRoutes)
app.use('/api/planhistory', planHistoryRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);  
});


app.use((req,res,next)=>{
  res.set('Cache-Control','no-store')
  next()
})


