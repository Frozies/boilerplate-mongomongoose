require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})


let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var davinYoung = new Person({name: "Davin Young", age: 23, favoriteFoods: ['pizza']}); // document instance

  davinYoung.save((err,data) => {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "Davin"},
  {name: "Renee"},
  {name: "Roger"},
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, ((err, docs) => {
    if (err) return console.error(err);
    done(null, arrayOfPeople);
  }))
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
