const express = require('express');
const connectToDb = require('./config/connectToDb');
const xss = require('xss-clean')
const rateLimiting = require('express-rate-limit')
const helmet = require('helmet')
const hpp = require('hpp')
const { errorHandler, notFound } = require('./middlewares/error');
const cors = require("cors")
require('dotenv').config()

// connection To Db
connectToDb()

// init app 
const app = express();

//  middleware
app.use(express.json())

// security headers (helmet)
app.use(helmet())

// prevent http param pollution
app.use(hpp())

// prevent XSS (Cross Site Scripting) Attacks
app.use(xss())

// Rate Limit
app.use(rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max:200,
}))

// cors Policy 
app.use(cors({
    origin: 'http://localhost:3000'
}))

// routes
app.use("/api/auth", require('./routes/authRoute'))
app.use("/api/users", require('./routes/usersRoute'))
app.use("/api/posts", require('./routes/postsRoute'))
app.use("/api/comments", require('./routes/commentsRoute'))
app.use("/api/categories", require('./routes/categoriesRoute'))
app.use("/api/password",require("./routes/passwordRoute"));

app.use(notFound)
app.use(errorHandler)

// running server
const Port = process.env.PORT || 8000
app.listen(Port,()=> console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${Port}`)
)
