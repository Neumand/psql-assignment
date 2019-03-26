const settings = require("./settings");
const { Client } = require("pg");
const client = new Client(settings);

client.connect(err => {
  if (err) {
    console.log("Connection error", err.stack);
  } else {
    console.log(`Connected to ${settings.database}`);
  }

  const [ node, path, first_name] = process.argv;
  console.log(first_name);
  const queryText = 'SELECT * FROM famous_people WHERE first_name = $1'
  // const values = 

  // client.query(queryText, values, (err, res) => {

  // })


});
