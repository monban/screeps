"use strict";

function takeHome(creep)
{
  const spawn = creep.room.find(FIND_MY_SPAWNS)[0];
  if (creep.pos.isNearTo(spawn))
    creep.transfer(spawn, RESOURCE_ENERGY);
  else
    creep.moveTo(spawn);
}

function mine(creep)
{
  const source = creep.room.find(FIND_SOURCES)[0];
  if (creep.pos.isNearTo(source))
    creep.harvest(source);
  else
    creep.moveTo(source);
}

module.exports = {
  run: function(creep) {
    if (_.sum(creep.carry) == creep.carryCapacity)
      takeHome(creep);
    else
      mine(creep);
  },
  bodyparts: [MOVE, WORK, CARRY]
};
