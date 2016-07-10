var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleHauler = require('role.hauler');
var roleSpawner = require('role.spawner');
var roleTower = require('role.tower');

module.exports.loop = function () {
    var spawn = Game.spawns['Spawn1'];
    var room = spawn.room;
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    for(const creep of room.find(FIND_MY_CREEPS)) {
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
    roleSpawner.run(spawn);

    for (let tower of spawn.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}})) {
      roleTower.run(tower);
    }
}
