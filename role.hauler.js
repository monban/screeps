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
  var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
  if(target) {
    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }
}

module.exports = {
  run: function(creep) {
    creep.say(creep.memory.mode);
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
