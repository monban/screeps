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
    const goodEnoughSpots = _.find(spots, i => _.find(i, j => j.terrain == 'plain') && !_.find(i, j => j.creep));
    if (goodEnoughSpots) {
      return creep.room.getPositionAt(goodEnoughSpot[0].x, goodEnoughSpot[0].y);
    } else
      return null;
  }
}

function setMemorySpot(creep, pos)
{
  creep.memory.spot = {x: pos.x, y: pos.y};
}

function getMemorySpot(creep)
{
  if (!creep.memory.spot)
    return null;
  return creep.room.getPositionAt(creep.memory.spot.x, creep.memory.spot.y);
}

var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    // Do we even have a remembered spot?
    let spot = getMemorySpot(creep);
    if (!spot) {
      const newSpot = findMySpot(creep);
      if (newSpot)
        setMemorySpot(creep, newSpot);
        spot = newSpot;
    }

    if (!spot)
      return;

    // Is someone already in our spot?
    const creepsAtSpot = creep.room.lookForAt(LOOK_CREEPS, spot);
    if (creepsAtSpot.length != 0 && creepsAtSpot[0] != creep) {
      // You're standing in my spot Sir
      creep.memory.spot = null;
      return;
    }
    // Are we at our spot?
    if (spot.isEqualTo(creep)) {
      var source = findOrRememberSource(creep);
      creep.harvest(source);
    } else {
      creep.moveTo(spot);
    }
  },
  bodyparts: [MOVE, WORK, WORK]
};

module.exports = roleHarvester;
