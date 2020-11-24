import * as mongoose from 'mongoose'
import { CONFIG } from './config'

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(`mongodb://root:cxm19970409@127.0.0.1/${CONFIG.DATABASE}?authSource=admin`,
    { useNewUrlParser: true, useUnifiedTopology: true })
const connection: any = mongoose.connection

connection.on('error', (error: any) => {
    console.log('连接数据库出错')
    console.log(error)
})

connection.once('open', () => {
    console.log('连接数据库成功')
})

export default connection
