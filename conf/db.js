const mongoose = require('mongoose');
require('dotenv').config();

/**
 * ========== Database =================
 * Connect to mongoDB server using the conneciton in the `.env` file.
 * MONGO_URL_DEV_STR = mongodb://<user>:<password>@localhost:27017/database_name
 */

 
const devConn = process.env.MONGO_URL_DEV_STR;
const prodConn = process.env.MONGO_URL_PROD_STR;
const conntoUse = ( process.env.NODE_ENV && process.env.NODE_ENV === 'production' ) ? prodConn : devConn;
const envStr = ( process.env.NODE_ENV && process.env.NODE_ENV === 'production' ) ? 'PROD' : 'DEV';
/**
 * Connect to database environment
 */
mongoose.connect(prodConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log(`Database connected in ${envStr} environment.`)
})