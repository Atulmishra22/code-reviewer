require('dotenv').config()
const app = require('./src/app')

app.listen(3000, ()=>{
    console.log('this is running')
})