var DataProvider = function() {

  var data = [
    {
      name: 'John',
      surname: 'Dou',
      age: 21,
      photo: null,
      id: 1
    }, {
      name: 'Celvin',
      surname: 'Klein',
      age: 56,
      photo: '',
      id: 2
    }, {
      name: 'Philipp',
      surname: 'Plein',
      age: 42,
      photo: '',
      id: 3
    }, {
      name: 'Loro',
      surname: 'Piana',
      age: 18,
      photo: '',
      id: 4
    }
  ];

  this.getData = function(response) {
    response.send({
      status: 200,
      data: data
    });
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