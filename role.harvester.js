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

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var source = findOrRememberSource(creep);
        if (creep.ticksToLive == 1) {
            Memory.source_claims[source.id] = false;
            creep.suicide();
        }

        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
	},
	bodyparts: [MOVE, WORK, WORK]
};

module.exports = roleHarvester;
