require('dotenv').config()


const connectDB = require('./db/connect')
const Product = require('./modals/products')

const jsonProduct = require('./products.json')

const start = async()=>{
    try { 
        
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProduct)
        console.log('Success!!!');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()