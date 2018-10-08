const { instructors, cohorts } = require('./datasets/turing');
const { constellations, stars } = require('./datasets/astronomy');
const { cakes } = require('./datasets/cakes');
const { pie } = require('./datasets/pie');
const { clubs } = require('./datasets/clubs');
const { classrooms } = require('./datasets/classrooms');
const { mods } = require('./datasets/mods');
const { bosses, sidekicks } = require('./datasets/bosses');
const { kitties } = require('./datasets/kitties');
const { astronomy } = require('./datasets/astronomy');

// --DONE-- DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  //8 lines 2 proto
  studentsForEachInstructor() {
    // Return an array of instructors where each instructor is an object
    // with a name and the count of students in their module.

    const result = instructors.map(instructor => {
      return {
        name: instructor.name,
        studentCount: cohorts.find(cohort => {
          return instructor.module === cohort.module;
        }).studentCount
      };
    });

    return result;

    // Annotation:
    // Given an array of instructors and array of mods, I want to return
    // the name and count of students in their module.  Therefore I will use map
  },

  //10 lines 3 proto
  studentsPerInstructor() {
    // Return an object of how many students per teacher there are in each cohort e.g.

    const result = cohorts.map(cohort => {

      const myObj = {};

      let numInstructors = instructors.filter(instructor =>
        instructor.module == cohort.module).length;

      myObj[`cohort${cohort.cohort}`] = cohort.studentCount / numInstructors;

      return myObj;

    }).reduce((acc, curr) => {
      acc[Object.keys(curr)[0]] = curr[Object.keys(curr)[0]];
      return acc;
      }, {} );

    return result;

    // Annotation:
    // I want to use map since my ret will have as many objects as cohort.
    // I also want to use filter to find the # of instructors in the mod
  },

  //14 lines 3 proto
  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // { 
    //   Leta: [2, 4],
    //   Nathaniel: [2],
    //   Robbie: [4],
    //   Pam: [2, 4]
    // }




    const result = instructors.reduce((acc, instructor) => {
      const retArr = [];
      cohorts.forEach(cohort => {
        let canTeach = false;
        cohort.curriculum.forEach(skill => {
          if (instructor.teaches.indexOf(skill) !== -1) {
            canTeach = true;
          }
        });
        if (canTeach) retArr.push(cohort.module);
      });
      acc[instructor.name] = retArr;
      return acc;
    }, {});

    return result;

    // Annotation:
    // Then I want to reduce the cohorts array based on skills that match up with 
    // each cohorts curriculum
  },

  //15 lines 4 proto
  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // { 
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    const result = cohorts.reduce((skills, cohort) => {
      cohort.curriculum.forEach(skill => {
        if (skills.indexOf(skill) === -1)
          skills.push(skill);
      });
      return skills;
    }, []).reduce((retObj, skill) => {
      const hasSkills = [];
      instructors.forEach(instructor => {
        if (instructor.teaches.indexOf(skill) !== -1)
          hasSkills.push(instructor.name);
      })
      retObj[skill] = hasSkills;
      return retObj;
    },{});

    return result;

    // Annotation:
    // Need to reduce cohorts to an array of skills, then for each
    // Need to filter instructors by their skills which match
  }
};

// --DONE-- DATASET: mods from ./datasets/mods
const modPrompts = {
  //7 lines 1 proto
  studentsPerMod() {
    // Return an array of objects where the keys are mod (the number of the module)
    // and studentsPerInstructor (how many students per instructor there are for that mod) e.g.
    // [
    //   { mod: 1, studentsPerInstructor: 9 },
    //   { mod: 2, studentsPerInstructor: 11 },
    //   { mod: 3, studentsPerInstructor: 10 },
    //   { mod: 4, studentsPerInstructor: 8 }
    // ]

    const result = mods.reduce((arr, current) => {
      const retObj = {};
      retObj.mod = current.mod;
      retObj.studentsPerInstructor = current.students / current.instructors;
      arr.push(retObj);
      return arr;
    }, []);

    return result;

    // Annotation:
    // Given an array of 4 objects, one for each mod, I want to return
    // an array which shows students per instructor in each mod.  Therefore
    // I want to use reduce to accumulate an array with 4 objects.
  }
};

// --DONE-- DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  //3 lines 1 proto
  feClassrooms() {
    // Create an array of just the front-end classrooms. e.g.
    // [
    //   { roomLetter: 'A', program: 'FE', capacity: 32 },
    //   { roomLetter: 'C', program: 'FE', capacity: 27 },
    //   { roomLetter: 'E', program: 'FE', capacity: 22 },
    //   { roomLetter: 'G', program: 'FE', capacity: 29 }
    // ]

    const result = classrooms.filter(classroom => {
      return classroom.program === 'FE';
    });

    return result;

    // Annotation:
    // I'm given an array of classrooms and want just the front-end
    // classrooms, therefore I will use filter
  },

  //5 lines 2 proto
  totalCapacities() {
    // Create an object where the keys are 'feCapacity' and 'beCapacity',
    // and the values are the total capacity for all classrooms in each program e.g.
    // { 
    //   feCapacity: 110,
    //   beCapacity: 96
    // }

    let feClassRooms = classrooms.filter(classroom => classroom.program === 'FE');
    let beClassRooms = classrooms.filter(classroom => classroom.program === 'BE');

    let feCap = feClassRooms.reduce((acc, curr) => acc + curr.capacity, 0);
    let beCap = beClassRooms.reduce((acc, curr) => acc + curr.capacity, 0);


    const result = { beCapacity: beCap, feCapacity: feCap };
    return result;

    // Annotation:
    // I'm given an array of classrooms, and I want to filter the array
    // for each classroom type, then reduce the sum of the capacities for each.
  },

  //1 line 1 proto
  sortByCapacity() {
    // Return the array of classrooms sorted by their capacity (least capacity to greatest)

    const result = classrooms.sort((a, b) => a.capacity > b.capacity);
    return result;

    // Annotation:
    // Given an array of classrooms, I want to sort them by capacity.
    // Therefore I will use sort().
  }
};

// --DONE-- DATASET: cakes from ./datasets/cakes
const cakePrompts = {
  //8 lines 2 proto
  allToppings() {
    // Return an array of all unique toppings (no duplicates) needed to bake
    // every cake in the dataset e.g.
    // ['dutch process cocoa', 'toasted sugar', 'smoked sea salt', 'berries', ..etc]

    let allToppings = [];

    cakes.forEach(cake => {
      cake.toppings.forEach(topping => allToppings.push(topping));
    });

    allToppings = allToppings.filter((topping, index) => {
      return allToppings.indexOf(topping) === index;
    });

    const result = allToppings;
    return result;

    // Annotation:
    // I am receiving an array of cakes, and I want to extract all
    // the toppings that are used in those cakes and then filter
    // that list so that there are no duplicates.  Therefore, I 
    // will use forEach to extract all of the toppings and then
    // I will use filter to filter out the duplicates.
  },

  //9 lines 2 proto
  groceryList() {
    // I need to make a grocery list. Please give me an object where the keys are
    // each topping, and the values are the amount of that topping I need to buy e.g.
    // { 
    //    'dutch process cocoa': 1,
    //    'toasted sugar': 3,
    //    'smoked sea salt': 3,
    //    'berries': 2, 
    //    ...etc
    // }

    let myResult = {};

    cakes.forEach(cake => {
      cake.toppings.forEach(topping => {
        if (myResult[topping] === undefined)
          myResult[topping] = 0;
        myResult[topping] += 1;
      });
    });

    const result = myResult;
    return result;

    // Annotation:
    // I am receiving an array of cakes, and I want to count the 
    // amount of each ingredient I should buy at the store.  Therefore
    // I will use forEach to iterate over each cake, then forEach again
    // to iterate over the ingredient list and update my return object with
    // the count of that item.
  },

  // 6 lines 1 proto
  stockPerCake() {
    // Return an array of objects that include just the flavor of the cake and how
    // much of that cake is in stock e.g.
    // [ 
    //    { flavor: 'honey', inStock: 3 },
    //    { flavor: 'vanilla', inStock: 21 },
    //    ..etc
    // ]

    const result = cakes.map(cake => {
      return {
        cakeFlavor: cake.cakeFlavor,
        inStock: cake.inStock
      }
    });

    return result;

    // Annotation:
    // I am recieving an array of cakes, and I want to display an inventory
    // based on the cakes flavor.  Therefore I will use map to return a 
    // modified version of the cakes array.
  },

  //3 lines 1 proto
  totalInventory() {
    // Return the total amout of cakes in stock e.g.
    // 59

    const result = cakes.reduce((acc, curr) => {
      return acc + curr.inStock;
    }, 0);

    return result;

    // Annotation:
    // I am recieving an array of cakes, and I want to return the total number
    // of cakes in stock.  Therefore I will use reduce to accumulate the num
    // of cakes in inventory.
  },

  //1 line 1 proto
  onlyInStock() {

    let myReturn = cakes.filter(cake => cake.inStock > 0);
    return myReturn;


    // ANNOTATION: I'm recieving an array of cakes, and I want a 
    // subset of that array, so I'm going to reach for filter.my 
    // filter callback will return only the cakes who have an 
    // inStock value.
  }
};

// --DONE-- DATASET: pie from ./datasets/pie

const piePrompts = {
  //6 lines 1 proto
  howManyIngredients() {
    // The bakery needs to make more rhubarb pies in order to meet the
    // desiredInventoryCount. Programmatically determine how many more pies
    // need to be made, and return an object of the total number of ingredients we need
    // we need to buy in order to make the remaining pies. e.g.:
    // {
    //   cinnamon: 50,
    //   sugar: 100
    // }


    let numToMake = pie.desiredInventoryCount - pie.inventoryCount;
    let retObj = {}

    Object.keys(pie.ingredients).forEach(ingredient => {
      retObj[ingredient] = pie.ingredients[ingredient] * numToMake;
    });
    const result = retObj;
    return result;

    // Annotation:
    // I have a pie Object and need to extract the desired inventory 
    // and compare it to the current inventory, then multiply the necessary
    // ingredients for one pie by the amount of more pies I want to make.
  }
};

// --DONE-- DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  //12 lines 2 proto
  membersBelongingToClubs() {
    // Create an object whose keys are the names of people, and whose values are
    // arrays that include the names of the clubs that person is a part of. e.g. 
    // {
    //   Louisa: ['Drama', 'Art'],
    //   Pam: ['Drama', 'Art', 'Chess'],
    //   ...etc
    // }
    let myObj = {};
    clubs.forEach(club => {
      club.members.forEach(member => {
        if (myObj[member] === undefined) {
          myObj[member] = [club.club];
        }
        else {
          myObj[member].push(club.club);
        }
      });
    });

    const result = myObj;
    return result;

    // Annotation:
    // I am given an object of clubs, and need create an object that shows
    // every club that an individual is in.  I will use forEach to iterate
    // over each club, and append that club name to that persons array
    // of clubs in my return Obj.
  }
};

// --DONE-- DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  //12 lines 1 proto
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]

    // retObj = {};

    // sidekicks.forEach(sidekick => {
    //   if (retObj[sidekick.boss] === undefined)
    //     retObj[sidekick.boss] = {
    //       bossName: sidekick.boss,
    //       sidekickLoyalty: sidekick.loyaltyToBoss
    //     }
    //   else {
    //     retObj[sidekick.boss].sidekickLoyalty += sidekick.loyaltyToBoss;
    //   }
    // })

    const result = Object.keys(bosses).map(bossName => {
      retObj = {};
      retObj.bossName = bossName;
      retObj.sidekickLoyalty = 0;
      sidekicks.forEach(sidekick => {
        if (sidekick.boss.toLowerCase() === bossName.toLowerCase())
          retObj.sidekickLoyalty += sidekick.loyaltyToBoss;
      });
      return retObj;
    });

    

    return result;

    // Annotation:
    // I am given a group of bosses, and a list of sidekicks
  }
};

// --DONE-- DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  //1 line 1 proto
  orangeKittyNames() {
    // Return an array of just the names of kitties who are orange e.g.
    // ['Tiger', 'Snickers']

    const result = kitties.filter(kitty => kitty.color === 'orange').map(kitty => kitty.name);
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  //1 line 1 proto
  sortByAge() {
    // Sort the kitties by their age

    const result = kitties.sort((a, b) => a.age > b.age);
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  //1 line 1 proto
  growUp() {
    // Return an array of kitties who have all grown up by 2 years e.g.
    // [{
    //   name: 'Felicia',
    //   age: 4,
    //   color: 'grey'
    // },
    // {
    //   name: 'Tiger',
    //   age: 7,
    //   color: 'orange'
    // },
    // ...etc]

    const result = kitties.filter(kitty => kitty.age > 2);
    return result;

  }
};

// DATASET: bosses, sidekicks from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the stars that appear in any of the constellations
    // listed in the constellations object e.g.
    // [ 
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' }
    // ]

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    const result = stars.reduce((star, retObj) => {
      if (star.color in retObj) {
        retObj[star.color].push(star);
      }
      else {
        retObj[star.color] = [star];
      }
      return retObj;
    }, {});

    
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  constellationsStarsExistIn() {
    // Return an array of the names of the constellations that the brightest stars are part of e.g.
    // [ 'Canis Major',
    //   'Carina',
    //   'Boötes',
    //   'Lyra',
    //   'Auriga',
    //   'Orion',
    //   'Canis Minor',
    //   'Eridanus',
    //   'Orion',
    //   'Centaurus' ]

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = {
  cakePrompts,
  turingPrompts,
  piePrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  astronomyPrompts,
  kittyPrompts,
  astronomyPrompts
};