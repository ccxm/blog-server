"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("./config");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb://root:cxm19970409@193.112.72.251/${config_1.CONFIG.DATABASE}?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', (error) => {
    console.log('连接数据库出错');
    console.log(error);
});
connection.once('open', () => {
    console.log('连接数据库成功');
});
exports.default = connection;
//# sourceMappingURL=connectDB.js.map