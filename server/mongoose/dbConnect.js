import mongoose from 'mongoose'
import ArticleModel from "../model/Article"
import config from '../config/config'

mongoose.connect(config.db.url ,{ useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db success');
});
export default ArticleModel