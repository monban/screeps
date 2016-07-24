"use strict";

function findOrRememberSource(creep)
{
  //    if (!Memory.source_claims) {
  //        Memory.source_claims = new Array();
  //    }
  //    if (creep.memory.source) {
  //        return Game.getObjectById(creep.memory.source);
  //    } else {
  //        var sources = creep.room.find(FIND_SOURCES);
  //        for (var i=0; i<sources.length; i++) {
  //            var source = sources[i];
  //            if (Memory.source_claims[source.id])
  //                continue;
  //            creep.memory.source = source.id;
  //            Memory.source_claims[source.id] = true;
  //        }
  //    }
  return creep.room.find(FIND_SOURCES)[0];
}

// This function is pretty ugly
function findMySpot(creep)
{
  const pos = findOrRememberSource(creep).pos;
  const area = creep.room.lookAtArea(pos.y-1, pos.x-1, pos.y+1, pos.x+1, true);
  const spots = _.groupBy(area, i => [i.x, i.y]);
  const openSpots = _.filter(spots, i => _.find(i, j => j.structure && j.structure.structureType == STRUCTURE_CONTAINER) && !_.find(i, j => j.creep));
  if (openSpots.length != 0) {
    return creep.room.getPositionAt(openSpots[0][0].x, openSpots[0][0].y);
  } else {
    const goodEnoughSpot = _.find(spots, i => _.find(i, j => j.terrain == 'plain') && !_.find(i, j => j.creep))[0];
    if (goodEnoughSpot) {
      return creep.room.getPositionAt(goodEnoughSpot.x, goodEnoughSpot.y);
    } else
      return null;
  }
}

var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    // Do we even have a remembered spot?
    if (!creep.memory.spot) {
      const newSpot = findMySpot(creep);
      if (newSpot) {
        creep.memory.spot = {x: newSpot.x, y: newSpot.y};
      } else {
        return;
      }
    }

    // Is someone already in our spot?
    const creepsAtSpot = creep.room.lookForAt(LOOK_CREEPS, creep.memory.spot.x, creep.memory.spot.y);
    if (creepsAtSpot.length != 0 && creepsAtSpot[0] != creep) {
      // You're standing in my spot Sir
      creep.memory.spot = findMySpot(creep);
    }
    // Are we at our spot?
    if (creep.pos.x == creep.memory.spot.x && creep.pos.y == creep.memory.spot.y) {
      var source = findOrRememberSource(creep);
      creep.harvest(source);
    } else {
      creep.moveTo(creep.memory.spot.x, creep.memory.spot.y);
    }
  },
  bodyparts: [MOVE, WORK, WORK]
};

module.exports = roleHarvester;
