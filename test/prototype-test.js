const { expect } = require('chai');
const { turingPrompts, cakePrompts, bossPrompts, clubPrompts, classPrompts, modPrompts, piePrompts } = require('../prototypes/index');

describe('PROTOTYPES', () => {
  describe('Turing Prompts', () => {
    it('studentsForEachInstructor', () => {
      const result = turingPrompts.studentsForEachInstructor();
      expect(result).to.deep.equal(
        [
          { "name": "Pam", "studentCount": 21 },
          { "name": "Brittany", "studentCount": 21 },
          { "name": "Nathaniel", "studentCount": 21 },
          { "name": "Robbie", "studentCount": 18 },
          { "name": "Leta", "studentCount": 18 },
          { "name": "Travis", "studentCount": 30 },
          { "name": "Louisa", "studentCount": 30 },
          { "name": "Christie", "studentCount": 20 },
          { "name": "Will", "studentCount": 20 }
        ]
      );
    });

    it('studentsPerInstructor', () => {
      const result = turingPrompts.studentsPerInstructor();
      expect(result).to.deep.equal(
        {
          cohort1806: 15,
          cohort1804: 7,
          cohort1803: 10,
          cohort1801: 9
        }
      );
    });

    it('modulesPerTeacher', () => {
      const result = turingPrompts.modulesPerTeacher();
      expect(result).to.deep.equal(
        {
          Pam: [2, 4],
          Brittany: [2, 4],
          Nathaniel: [2, 4],
          Robbie: [4],
          Leta: [2, 4],
          Travis: [1, 2, 3, 4],
          Louisa: [1, 2, 3, 4],
          Christie: [1, 2, 3, 4],
          Will: [1, 2, 3, 4]
        }
      );
    });

    it('curriculumPerTeacher', () => {
      const result = turingPrompts.curriculumPerTeacher();
      expect(result).to.deep.equal(
        {
          html: ['Travis', 'Louisa'],
          css: ['Travis', 'Louisa'],
          javascript: ['Travis', 'Louisa', 'Christie', 'Will'],
          recursion: ['Pam', 'Leta'],
          scope: ['Pam', 'Nathaniel', 'Will'],
          oop: ['Brittany', 'Nathaniel', 'Will'],
          react: ['Christie', 'Will'],
          redux: ['Will'],
          pwas: ['Brittany', 'Robbie', 'Leta', 'Louisa'],
          mobile: ['Nathaniel'],
          node: ['Pam', 'Robbie', 'Leta', 'Louisa', 'Christie']
        }
      );
    });

  });
  
  describe('Cake Prompts', () => {
    it('onlyInStock', () => {
      const result = cakePrompts.onlyInStock();
      expect(result).to.deep.equal(
        [
          {
            cakeFlavor: 'dark chocolate',
            filling: null,
            frosting: 'dark chocolate ganache',
            toppings: ['dutch process cocoa', 'toasted sugar', 'smoked sea salt'],
            inStock: 15
          },
          {
            cakeFlavor: 'yellow',
            filling: 'citrus glaze',
            frosting: 'chantilly cream',
            toppings: ['berries', 'edible flowers'],
            inStock: 14
          },
          {
            cakeFlavor: 'butter rum',
            filling: 'ginger cardamom swirl',
            frosting: 'spiced rum glaze',
            toppings: ['crystallized ginger', 'toasted sugar'],
            inStock: 9
          },
          {
            cakeFlavor: 'vanilla',
            filling: 'St Germaine',
            frosting: 'whipped cream',
            toppings: ['smoked sea salt', 'crystallized ginger', 'berries'],
            inStock: 21
          }
        ]
      );
    });

    it('allToppings', () => {
      const result = cakePrompts.allToppings();
      expect(result).to.deep.equal(
        ['dutch process cocoa',
          'toasted sugar',
          'smoked sea salt',
          'berries',
          'edible flowers',
          'mint',
          'cranberry',
          'crystallized ginger'
        ]
      )
    });

    it('groceryList', () => {
      const result = cakePrompts.groceryList();
      expect(result).to.deep.equal(
        {
          'dutch process cocoa': 1,
          'toasted sugar': 3,
          'smoked sea salt': 3,
          berries: 2,
          'edible flowers': 2,
          mint: 1,
          cranberry: 1,
          'crystallized ginger': 2
        }
      );
    });

    it('stockPerCake', () => {
      const result = cakePrompts.stockPerCake();
      expect(result).to.deep.equal(
        [
          { cakeFlavor: 'dark chocolate', inStock: 15 },
          { cakeFlavor: 'yellow', inStock: 14 },
          { cakeFlavor: 'white chiffon', inStock: 0 },
          { cakeFlavor: 'butter rum', inStock: 9 },
          { cakeFlavor: 'vanilla', inStock: 21 },
          { cakeFlavor: 'honey', inStock: 0 }
        ]
      );
    });

    it('totalInventory', () => {
      const result = cakePrompts.totalInventory();
      expect(result).to.deep.equal(59);
    });

  });

  describe('Club Prompts', () => {
    it('membersBelongingToClubs', () => {
       const result = clubPrompts.membersBelongingToClubs();
      expect(result).to.deep.equal(
        {
          "Brittany": ["Chess","Newspaper"],
          "Christie": ["Newspaper","FBLA"],
          "David":    ["Chess","Newspaper","FBLA"],
          "Jhun":     ["Band","Art"],
          "Leta":     ["Band","Newspaper","Astronomy"],
          "Louisa":   ["Drama","Art"],
          "Nathaniel":["Drama","Astronomy"],
          "Pam":      ["Drama","Chess","Newspaper"],
          "Robbie":   ["Band","Chess","FBLA"],
          "Will":     ["Band"]
        }

      );
    });
  });

  describe('Class Prompts', () => {
    it('feClassrooms', () => {
      const result = classPrompts.feClassrooms();
      expect(result).to.deep.equal(
        [
          { roomLetter: 'A', program: 'FE', capacity: 32 },
          { roomLetter: 'C', program: 'FE', capacity: 27 },
          { roomLetter: 'E', program: 'FE', capacity: 22 },
          { roomLetter: 'G', program: 'FE', capacity: 29 }
        ]
      );
    });

    it('totalCapacities', () => {
      const result = classPrompts.totalCapacities();
      expect(result).to.deep.equal({ beCapacity: 96, feCapacity: 110 });
    });

    it('sortByCapacity', () => {
      const result = classPrompts.sortByCapacity();
      expect(result).to.deep.equal(
        [
          { roomLetter: 'H', program: 'BE', capacity: 18 },
          { roomLetter: 'F', program: 'BE', capacity: 19 },
          { roomLetter: 'E', program: 'FE', capacity: 22 },
          { roomLetter: 'C', program: 'FE', capacity: 27 },
          { roomLetter: 'B', program: 'BE', capacity: 29 },
          { roomLetter: 'G', program: 'FE', capacity: 29 },
          { roomLetter: 'D', program: 'BE', capacity: 30 },
          { roomLetter: 'A', program: 'FE', capacity: 32 }
        ]
      );
    });
  });

  describe('Mod Prompts', () => {
    it('studentsPerMod', () => {
      const result = modPrompts.studentsPerMod();
      expect(result).to.deep.equal(
        [
          { mod: 1, studentsPerInstructor: 9 },
          { mod: 2, studentsPerInstructor: 11 },
          { mod: 3, studentsPerInstructor: 10 },
          { mod: 4, studentsPerInstructor: 8 }
        ]
      );
    });
  });

  describe('Pie Prompts', () => {
    it('howManyIngredients', () => {
      const result = piePrompts.howManyIngredients();
      expect(result).to.deep.equal({ cinnamon: 50, sugar: 100 });
    });
  });

  describe('Boss Prompts', () => {
     it('bossLoyalty', () => {
       const result = bossPrompts.bossLoyalty();
       expect(result).to.deep.equal(
         {
           Scar: { bossName: 'Scar', sidekickLoyalty: 16 },
           Ursula: { bossName: 'Ursula', sidekickLoyalty: 20 },
           Jafar: { bossName: 'Jafar', sidekickLoyalty: 3 }
         }
      );
    });
  });

});