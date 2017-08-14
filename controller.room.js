"use strict";
//const controllerCreep = require('controller.creep');
const roleSpawner = require('role.spawner');
//const roleTower = require('role.tower');

module.exports = function(room) {
  if (!room.memory.tasks) { room.memory.tasks = [] }
  if (!room.memory.task) {
    room.memory.task = 'bootstrapping';
  }
  switch (room.memory.task) {
    case 'bootstrapping':
      ensure_population(room, {'bootstrapper': 3});
      break;
  }


  for(const creep of room.find(FIND_MY_CREEPS)) {
    //controllerCreep(creep);
  }

  for (const structure of room.find(FIND_MY_STRUCTURES)) {
    switch (structure.structureType) {
      case STRUCTURE_TOWER:
        //roleTower.run(structure);
        break;
      case STRUCTURE_SPAWN:
        roleSpawner.run(structure);
        break;
      default:
        break;
    }
  }
};

function ensure_population(room, pops)
{
  _.forOwn(pops, (count, creep_type) => {
    let current_population = room.find(FIND_MY_CREEPS, {
      filter: {'role': creep_type}
    }).length;
    let queued_for_spawn = _.filter(room.memory.tasks,
      {'task': 'spawn_creep', 'role': creep_type}).length;
    let upcoming_population = current_population + queued_for_spawn;
    let needed = count - upcoming_population;
    
    if (needed > 0) {
      _.times(needed, () => {
        room.memory.tasks.push({
          'task': 'spawn_creep', 
          'role': creep_type,
          'assigned': false
      })});
    }
  });
}

