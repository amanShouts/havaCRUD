const fs = require('fs');

const getHeathCheck = (req, res) => {
  // const input = req. 
  const { names, ages } = req.body;
  console.log(names, ages);

  let str = '';
  // header 
  str += 'Names' + ',' + 'Ages' + '\n'

  for (let i = 0; i < names.length; i++) {
    str += names[i] + ',' + ages[i] + '\n'
  }

  fs.writeFile('a.csv', str, 'utf8', function (err) {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
      console.log('It\'s saved!');
    }
  });

  res.status(200).json({ heath: 'good' });
}

const getName = (req, res) => {
  const {name} = req.query;

var csvData=[];
fs.createReadStream(req.file.path)
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something with csvData
      console.log(csvData);
    });
}

module.exports = { getHeathCheck }

// name and ages => list
// csv file with two rows 

// database