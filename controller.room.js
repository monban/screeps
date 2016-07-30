'use strict';
const controllerCreep = require('controller.creep');
const roleSpawner = require('role.spawner');
const roleTower = require('role.tower');

module.exports = function(room) {
  for(const creep of room.find(FIND_MY_CREEPS))
    controllerCreep(creep);

  for (const structure of room.find(FIND_MY_STRUCTURES)) {
    switch (structure.structureType) {
      case STRUCTURE_TOWER:
        roleTower.run(structure);
        break;
      case STRUCTURE_SPAWN:
        roleSpawner.run(structure);
        break;
      default:
        break;
    }
  }
}
