const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleHauler = require('role.hauler');
const roleSpawner = require('role.spawner');
const roleTower = require('role.tower');
const profiler = require('screeps-profiler');
const utils = require('utils');

function senescense(creep)
{
  creep.say('senescense');
  if (creep.pos.isNearTo(Game.spawns['Spawn1'])) {
    switch (Game.spawns['Spawn1'].renewCreep(creep)) {
      case ERR_FULL:
      creep.memory.senescense = false;
      break;
      case OK:
      creep.memory.senescense = true;
      break;
    }
  } else {
    creep.moveTo(Game.spawns['Spawn1']);
  }
}
function main() {
  // Every 100 ticks
  if (Game.time % 100) {
    // Clean up memory
    utils.memory.clean();
  }

  _.forEach(Game.rooms, function(room) {
    for(const creep of room.find(FIND_MY_CREEPS)) {
      if (creep.ticksToLive < 150 || creep.memory.senescense == true) {
        // This creep is about to die, override AI and be renewed
        senescense(creep);
      } else {
        // Run the correct role function based on memory.role
        switch (creep.memory.role) {
          case 'harvester' :
            roleHarvester.run(creep);
            break;
          case 'upgrader':
            roleUpgrader.run(creep);
            break;
          case 'hauler':
            roleHauler.run(creep);
            break;
        }
      }
    }
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
  });
}

profiler.enable();
module.exports.loop = function() {
  profiler.wrap(main);
}
