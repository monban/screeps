"use strict";

function getNextRepairTarget(tower) {
  const roads = tower.room.find(FIND_STRUCTURES, {
    filter: i => i.structureType == STRUCTURE_ROAD && i.hits < i.hitsMax ||
      i.structureType == STRUCTURE_CONTAINER && i.hits < i.hitsMax
  });
  roads.sort((a,b) => b.hits - a.hits);
  if (roads.length != 0) {
    Memory.towers[tower.id].repairTarget = roads[0].id;
  }
}

function setupMemory(tower) {
  if (!Memory.towers) {
    Memory.towers = new Object;
  }
  if (!Memory.towers[tower.id]) {
    Memory.towers[tower.id] = new Object;
  }
}
module.exports = {
  run: function(tower) {
    if (!Memory.towers || !Memory.towers[tower.id]) {
      setupMemory(tower);
    }
    const hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
      tower.attack(hostiles[0]);
    } else {
      const target = Game.getObjectById(Memory.towers[tower.id].repairTarget);
      if (target && target.hits < target.hitsMax) {
        tower.repair(target);
      } else {
        getNextRepairTarget(tower);
      }
    }
  }
}
