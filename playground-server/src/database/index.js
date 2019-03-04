const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const {
  MONGO_URI: mongoUri
} = process.env;

module.exports = (function() {
  mongoose.Promise = global.Promise;
  return{
    connect() {
      const connect = mongoose.createConnection(mongoUri);
      autoIncrement.initialize(connect);
      return mongoose.connect(mongoUri)
        .then(
          () => {
            console.log(`successfully mongoDB connected`);
          }
        ).catch(e => {
          console.log(e);
        });
    },
    disconnect() {
      return mongoose.disconnect();
    }
  };
})();