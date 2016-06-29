var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleHauler = require('role.hauler');

module.exports = {
    run: function(spawn) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        if (!spawn.spawning) {
            if (harvesters.length < 2) {
                spawn.createCreep(roleHarvester.bodyparts, null, {role: 'harvester'});
            } else if (haulers.length < 2) {
                spawn.createCreep(roleHauler.bodyparts, null, {role: 'hauler'});
            } else if (upgraders.length < 1 || spawn.energy == spawn.energyCapacity) {
                spawn.createCreep(roleUpgrader.bodyparts, null, {role: 'upgrader'});
            } else {
                for (var name in upgraders) {
        			var upgrader = upgraders[name];
        			if (spawn.energy > upgrader.carryCapacity) {
    			    	spawn.transferEnergy(upgrader);
	   		        }
                }
            }
        }
    }
};
