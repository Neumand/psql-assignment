const settings = require("./settings");
const { Client } = require("pg");
const client = new Client(settings);

client.connect(err => {
  if (err) {
    console.log("Connection error", err.stack);
  } else {
    console.log(`Connected to ${settings.database}`);
  }

  const [node, path, firstName] = process.argv;
  const queryText = "SELECT * FROM famous_people WHERE first_name = $1";
  const values = [firstName];

  client.query(queryText, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows);
    }
    client.end();
  });
});
