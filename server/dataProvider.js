var DataProvider = function() {
  var data = require('./volumes.json');

  this.getData = function(response) {
  return data
  };

  this.updateData = function(data, response) {
    if (data.id) {
      _updateData(data);
    } else { 
      response.status(400).send({
        status: 400,
        data: 'Incorrect data format'
      });
    }
    
    
  };

  this.addData = function(data, response) {
    console.log(data);
  };
  
  function _updateData(data, response) { 
  };


};

module.exports = new DataProvider();