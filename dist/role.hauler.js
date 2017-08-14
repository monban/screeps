"use strict";
const utils = require('utils');

function doDelivery(creep)
{
  creep.say('delivering');
  const storages = creep.room.find(FIND_MY_STRUCTURES, {
    filter: i => (i.structureType == STRUCTURE_EXTENSION && i.energy < i.energyCapacity) ||
      (i.structureType == STRUCTURE_STORAGE && _.sum(i.store) < i.storeCapacity) ||
      (i.energy < (i.energyCapacity - creep.carryCapacity))
  });
  storages.sort(utils.filters.compare_buildings_by_priority);
  const target = storages[0];
  if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
}

function findDroppedEnergy(creep)
{
  const drops =  creep.room.find(FIND_DROPPED_ENERGY, {filter: i =>
    creep.pos.getRangeTo(i.pos) < 10 ||
      i.amount > 150
  });
  drops.sort((a,b) => b.amount - a.amount);
  
  if (drops.length > 0) {
    if (creep.pickup(drops[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(drops[0]);
    }
    return true;
  } else {
    return false;
  }
}

function doRefuel(creep)
{
  creep.say('refueling');
  if (creep.room.find(FIND_HOSTILE_CREEPS).length == 0) {
    if (findDroppedEnergy(creep)) {
      return;
    }
  }
  const storages = creep.room.find(FIND_STRUCTURES, {
    filter: i => i.structureType == STRUCTURE_CONTAINER 
  });
  storages.sort((a,b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
  if (storages.length > 0) {
    if (creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(storages[0]);
    }
  }
}

module.exports = {
  run: function(creep) {
    if ((creep.room.lookForAt(LOOK_STRUCTURES, creep).length == 0) && (creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, creep).length == 0)) {
      creep.room.createConstructionSite(creep, STRUCTURE_ROAD);
    }
    if (creep.memory.mode == 'refuel') {
      if (_.sum(creep.carry) == creep.carryCapacity) {
        creep.memory.mode = 'deliver';
        doDelivery(creep);
      } else {
        doRefuel(creep);
      }
    } else {
       if (creep.carry[RESOURCE_ENERGY] == 0) {
         creep.memory.mode = 'refuel';
         doRefuel(creep); 
       } else {
         doDelivery(creep);
       }
    }
  },
  bodyparts: [MOVE, MOVE, CARRY, CARRY]
};
