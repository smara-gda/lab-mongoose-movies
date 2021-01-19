const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  name: {
    type: String
  },
  occupation: {
    type: String
  },
  catchPhrase: {
    type: String
  }
});

const Celebritie = mongoose.model('Celebritie', celebritySchema);

module.exports = Celebritie;
