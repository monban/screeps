const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleHauler = require('role.hauler');
const roleSpawner = require('role.spawner');
const roleTower = require('role.tower');
const profiler = require('screeps-profiler');

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
  const spawn = Game.spawns['Spawn1'];
  const room = spawn.room;
  for(let name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }

  for(const creep of room.find(FIND_MY_CREEPS)) {
    if (creep.ticksToLive < 150 || creep.memory.senescense == true) {
      senescense(creep);
    } else {
      if(creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
      }
      if(creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
      }
      if(creep.memory.role == 'hauler') {
        roleHauler.run(creep);
      }
    }
  }
  roleSpawner.run(spawn);

  for (let tower of spawn.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}})) {
    roleTower.run(tower);
  }
}

profiler.enable();
module.exports.loop = function() {
  profiler.wrap(main);
}
