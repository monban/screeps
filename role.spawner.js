"use strict";
const roleBootstrapper = require('role.bootstrapper');
//const roleHarvester = require('role.harvester');
//const roleUpgrader = require('role.upgrader');
//const roleHauler = require('role.hauler');

module.exports = {
  run: function(spawn) {
    if (!spawn.spawning) {
      const task_index = _.findIndex(spawn.room.memory.tasks, {'task': 'spawn_creep'});
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
          spawn.room.memory.tasks.splice(task_index, 1);
          spawn.createCreep(bodyparts, null, {'role': task.role});
        } else {
          console.log('wanted to spawn ' + task.role + ' but couldnt, reason: ' + res);
        }
      }
    }
  }
};
