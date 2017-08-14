"use strict";
const utils = require('utils');
const controllerRoom = require('controller.room');

module.exports.loop = function() {
  // Every 100 ticks
  if (Game.time % 100 == 0) {
    // Clean up memory
    utils.memory.clean();
  }
  // Run the room controller on each room in turn
  _.forEach(Game.rooms, controllerRoom);
};

