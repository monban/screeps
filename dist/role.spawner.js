"use strict";
const roleBootstrapper = require('role.bootstrapper');
//const roleHarvester = require('role.harvester');
//const roleUpgrader = require('role.upgrader');
//const roleHauler = require('role.hauler');

module.exports = {
  run: function(spawn) {
    if (!spawn.spawning) {
      // Remove any completed tasks
      _.remove(spawn.room.memory.tasks, {'assigned': spawn.id});

      const task_index = _.findIndex(spawn.room.memory.tasks, {'task': 'spawn_creep', 'assigned': false});
      if (task_index != -1) {
        let task = spawn.room.memory.tasks[task_index];
        let bodyparts = [];
        switch (task.role) {
          case 'bootstrapper':
            bodyparts = roleBootstrapper.bodyparts;
            break;
          case 'harvester':
            break;
          case 'hauler':
            break;
          case 'upgrader':
            break;
          default:
            console.log('unable to spawn creep of type ' + task.role + 'returning to queue');
            break;
        }
        let res = spawn.canCreateCreep(bodyparts);
        if (res == OK) {
          spawn.room.memory.tasks[task_index].assigned = spawn.id;
          spawn.createCreep(bodyparts, null, {'role': task.role});
        }
      }
    }
  }
};
