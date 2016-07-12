module.exports = {
  run: function(creep) {
    if (_.sum(creep.carry) == creep.carryCapacity) {
      var storages = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (i) => (
                    (i.structureType == STRUCTURE_TOWER && i.energy < i.energyCapacity) ||
                    (i.structureType == STRUCTURE_STORAGE && _.sum(i.store) < i.storeCapacity) ||
                    (i.structureType == STRUCTURE_EXTENSION && i.energy < i.energyCapacity)
                    )
      });
      var target = storages[0];
      target = target || Game.spawns['Spawn1'];
      if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    } else {
      var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
      if(target) {
        if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    }
  },
  bodyparts: [MOVE, MOVE, CARRY, CARRY]
};
