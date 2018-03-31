const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/config');
const webpackConfig = require('../webpack.config');

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;

const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;

mongo.connect('mongodb://localhost:27017/login_demo',function(err,db){
  if(err){
    throw err;
  }

  client.on('connection',function(socket){
      let chat = db.collection('chats');

      sendStatus = function(s){
        socket.emit('status',s);
      }

      chat.find().limit(100).sort({_id:1}).toArray(function(err,res){
          if(err)
            throw err;

          socket.emit('output1', res);
      });

      socket.on('input',function(data){
          let name = data.name;
          let message = data.message;

          if(name == '' || message == ''){
              sendStatus('Please enter data!');
          }else{
              chat.insert({name:name,message:message},function(aa){
                  client.emit('output',data);

                  sendStatus({
                    message:'Success',
                    clear:true
                  });
              });
          }
      });

      socket.on('clear',function(data){
          chat.remove({},function(){
              socket.emit('cleared');
          });
      });
  });
})
// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
require('./routes')(app);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;
