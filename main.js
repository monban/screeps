const utils = require('utils');
const profiler = require('screeps-profiler');
const controllerRoom = require('controller.room');

profiler.enable();
module.exports.loop = function() {
  profiler.wrap(function() {
    // Every 100 ticks
    if (Game.time % 100 == 0) {
      // Clean up memory
      utils.memory.clean();
    }
    // Run the room controller on each room in turn
    _.forEach(Game.rooms, controllerRoom);
  });

}
