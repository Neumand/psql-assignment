const settings = require("./settings_knex");
const knex = require("knex")(settings);
const print = require('./find_people_knex');

const [node, path, firstName, lastName, birthdate] = process.argv;

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

if (!firstName || !lastName || !birthdate) {
  console.log(
    "Please enter information for all fields (first name, last name, and date of birth)."
  );
  process.exit(1);
}

console.log("Verifying new famous person information...");
knex("famous_people")
  .insert({ first_name: firstName, last_name: lastName, birthdate: birthdate })
  .asCallback((err, result) => {
    if (err) {
      return console.error(err);
    }
    console.log("Famous person successfully inserted!");
    knex
      .select()
      .from("famous_people")
      .asCallback((err, result) => {
        print.printPeople(result);
      });
    knex.destroy();
  });
