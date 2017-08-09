function gotoNextTask(creep)
{
  if (creep.carry.energy == 0) {
    creep.memory.task = 'refuel';
  } else if (damagedBuildings(creep).length) {
    creep.memory.task = 'repair';
  } else if (creep.room.find(FIND_CONSTRUCTION_SITES).length) {
    creep.memory.task = 'construct';
  } else {
    creep.memory.task = 'upgrade';
  }
}

function damagedBuildings(creep)
{
  return creep.room.find(FIND_STRUCTURES, {filter:function(structure) {
    return (structure.structureType == STRUCTURE_WALL) && (structure.hits < 50000) && (structure.hitsMax > 50000) ;
  }});

}

const roleUpgrader = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.carry.energy == 0) {
      gotoNextTask(creep);
    }
    switch (creep.memory.task) {
      case 'repair':
        const damaged_buildings = damagedBuildings(creep);
        if (damaged_buildings.length) {
          if (creep.repair(damaged_buildings[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(damaged_buildings[0])
          }
        } else {
          gotoNextTask(creep);
        }
        break;
      case 'upgrade':
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
        break;
      case 'construct':
        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if(target) {
          if (creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        } else {
          gotoNextTask(creep);
        }
        break;
      case 'refuel':
        const target = creep.room.storage || Game.spawns['Spawn1'];
        const result = creep.withdraw(target, RESOURCE_ENERGY, creep.carryCapacity);
        switch (result) {
          case ERR_NOT_IN_RANGE:
            creep.moveTo(target);
            break;
          case ERR_NOT_ENOUGH_RESOURCES:
            break;
          default:
            gotoNextTask(creep);
            break;
        }
        break;
      default:
        gotoNextTask(creep);
        break;
      }
  },
  bodyparts: [MOVE, MOVE, CARRY, CARRY, WORK]
};

module.exports = roleUpgrader;
