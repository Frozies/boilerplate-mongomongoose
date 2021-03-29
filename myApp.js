require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

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
  {name: "Davin", favoriteFoods: ['pizza', 'cheese']},
  {name: "Renee", favoriteFoods: ['chocolate', 'tea']},
  {name: "Roger", favoriteFoods: ['wings', 'cheese']},
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, ((err, docs) => {
    if (err) return console.error(err);
    done(null, arrayOfPeople);
  }));
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, ((err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  }));
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err,foodFound) => {
    if (err) return console.error(err);
    done(null, foodFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, foundById) => {
     if (err) return console.error(err);
     done(null, foundById);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, personByID) => {
    if (err) return console.error(err);

    personByID.favoriteFoods.push(foodToAdd);

    personByID.save((err,updatedPerson) => {
      if (err) return console.error(err);
      done (null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

/*  Person.findOneAndUpdate(personName, (err, foundPerson) => {
    if (err) return console.error(err);

    foundPerson.age = ageToSet;

    foundPerson.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    })
  }, { new: true });*/ // I think i was wrong lol

   Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, ((err, doc) => {
     if (err) return console.error(err);
     done(null, doc);
   }));
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, doc) => {
    if (err) return console.error(err);
    done(null, doc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, doc) => {
    if (err) return console.log(err);
    done(null, doc);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((err,doc) => {
    if(err) return console.error(err);
    done(null, doc);
  })
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
