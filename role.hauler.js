module.exports = {
    run: function(creep) {
        if (_.sum(creep.carry) == creep.carryCapacity) {
            if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
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
