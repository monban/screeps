module.exports = {
  run: function(creep) {
    if (_.sum(creep.carry) == creep.carryCapacity) {
      var storages = creep.room.find(FIND_MY_STRUCTURES, {
        filter: i => i.energy < i.energyCapacity
      });
      storages.sort(function(a,b) {
        var ast = a.structureType;
        var bst = b.structureType;
        if (ast == bst)
          return 0;
        if (ast == STRUCTURE_TOWER) // Give towers first priority on energy
          return -1;
        return 1;
      });
      var target = storages[0];
      target = target || creep.room.storage;
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
