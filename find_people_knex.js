const settings = require("./settings_knex");
const knex = require("knex")(settings);

const [node, path, firstName] = process.argv;

const printPeople = peopleArr => {
  for (const person of peopleArr) {
    const birthdate = person.birthdate.toISOString().substring(0, 10);
    console.log(
      `- ${person.id}: ${person.first_name} ${
        person.last_name
      }, born ${birthdate}`
    );
  }
};

if (!firstName) {
  console.log("Please enter a first name you would like to query.");
  process.exit(1);
}

console.log("Searching...");
knex
  .select("*")
  .from("famous_people")
  .where("first_name", firstName)
  .asCallback((err, result) => {
    if (err) {
      return console.error(err);
    }
    if (result.length < 1) {
      console.log(`Did not find anyone by the name ${firstName}.`);
      process.exit(1);
    }
    printPeople(result);
    knex.destroy();
  });

  module.exports = {
    printPeople
  }