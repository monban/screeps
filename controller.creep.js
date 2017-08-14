"use strict";
//var roleHarvester = require('role.harvester');
//var roleUpgrader = require('role.upgrader');
//var roleHauler = require('role.hauler');
const roleBootstrapper = require('role.bootstrapper');

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

module.exports = function(creep) {
  if (creep.ticksToLive < 150 || creep.memory.senescense == true) {
    // This creep is about to die, override AI and be renewed
    senescense(creep);
  } else {
    // Run the correct role function based on memory.role
    switch (creep.memory.role) {
      case 'bootstrapper':
        roleBootstrapper.run(creep);
        break;
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
