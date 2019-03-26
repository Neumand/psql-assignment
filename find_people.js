const settings = require("./settings");
const { Client } = require("pg");
const client = new Client(settings);

const findPeople = (firstName, cb) => {
  console.log("Searching...");
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

const printPeople = peopleArr => {
  for (const person of peopleArr) {
    console.log(
      `- ${person.id}: ${person.first_name} ${person.last_name}, born ${
        person.birthdate}`
    );
  }
};

client.connect(err => {
  if (err) {
    console.log("Connection error", err.stack);
  } else {
    console.log(`Connected to ${settings.database}`);
  }
  const [node, path, firstName] = process.argv;

  if (!firstName) {
    console.log("Please enter a first name you would like to query.");
    process.exit(1);
  }

  findPeople(firstName, function(result) {
    if (!result.rowCount) {
      console.log(`Did not find anyone by the name ${firstName}.`);
    } else {
      console.log(
        `Found ${result.rowCount} person(s) by the name ${firstName}:`
      );
      printPeople(result.rows);
    }
  });
});
