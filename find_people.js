const settings = require("./settings");
const { Client } = require("pg");
const client = new Client(settings);

const findPeople = (firstName, cb) => {
  const selectFirstName = "SELECT * FROM famous_people WHERE first_name = $1";
  const values = [firstName];
  client.query(selectFirstName, values, (err, res) => {
    if (err) {
      console.log(`Error running query: ${err.stack}`);
    } else {
      cb(res);
      client.end();
    }
  });
};

client.connect(err => {
  if (err) {
    console.log("Connection error", err.stack);
  } else {
    console.log(`Connected to ${settings.database}`);
  }

  const [node, path, firstName] = process.argv;
});
