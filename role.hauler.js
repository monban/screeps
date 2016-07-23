"use strict";

function compare_buildings_by_priority(a, b)
{
  const energyPriority = [
    STRUCTURE_SPAWN,
    STRUCTURE_TOWER,
    STRUCTURE_EXTENSION,
    STRUCTURE_STORAGE
  ];
  if (a.structureType == b.structureType)
    return 0;
  const a_priority = energyPriority.indexOf(a.structureType);
  const b_priority = energyPriority.indexOf(b.structureType);
  if (a_priority < b_priority)
		return -1;
	if (a_priority > b_priority)
		return 1;
}

function doDelivery(creep)
{
  creep.say('delivering');
  var storages = creep.room.find(FIND_MY_STRUCTURES, {
    filter: i => (i.structureType == STRUCTURE_EXTENSION && i.energy < i.energyCapacity) ||
      (i.structureType == STRUCTURE_STORAGE && _.sum(i.store) < i.storeCapacity) ||
      (i.energy < (i.energyCapacity - creep.carryCapacity))
  });
  storages.sort(compare_buildings_by_priority);
  var target = storages[0];
  if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
}

function doRefuel(creep)
{
  creep.say('refueling');
  const storages = creep.room.find(FIND_STRUCTURES, {
    filter: i => i.structureType == STRUCTURE_CONTAINER 
  });
  storages.sort((a,b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
  if (storages.length > 0) {
    if (creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(storages[0]);
    }
  } else {
    const target =  creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if (target) {
      if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
  }
}

module.exports = {
  run: function(creep) {
    if ((creep.room.lookForAt(LOOK_STRUCTURES, creep).length == 0) && (creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, creep).length == 0)) {
      creep.room.createConstructionSite(creep, STRUCTURE_ROAD);
    }
    if (creep.memory.mode = 'refuel') {
      if (_.sum(creep.carry) == creep.carryCapacity) {
        creep.memory.mode = 'deliver';
        doDelivery(creep);
      } else {
        doRefuel(creep);
      }
    } else {
       if (_.sum(creep.carry) == 0) {
         creep.memory.mode = 'refuel';
         doRefuel(creep); 
       } else {
         doDelivery(Creep);
       }
    }
  },
  bodyparts: [MOVE, MOVE, CARRY, CARRY]
};
