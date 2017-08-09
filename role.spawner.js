const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleHauler = require('role.hauler');

module.exports = {
  run: function(spawn) {
    if (!spawn.spawning) {
      var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
      var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
      var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

      if (harvesters.length < 3) {
        spawn.createCreep(roleHarvester.bodyparts, null, {role: 'harvester'});
      } else if (haulers.length < 3) {
        spawn.createCreep(roleHauler.bodyparts, null, {role: 'hauler'});
      } else if (upgraders.length < 3) {
        spawn.createCreep(roleUpgrader.bodyparts, null, {role: 'upgrader'});
      }
    }
  }
};
