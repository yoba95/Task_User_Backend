'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
     await queryInterface.bulkInsert('tasks', [{ 
        id: 1,
        description: 'curso backend',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
         id: 2,
        description: 'curso Angular',
        createdAt: new Date(),
        updatedAt: new Date()
     },{
        id: 3,
        description: 'curso javaScript',
        createdAt: new Date(),
        updatedAt: new Date()
     }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('tasks', null, {});
     
  }
};
