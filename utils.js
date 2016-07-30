'use strict';

module.exports = {
  filters: {
    compare_buildings_by_priority: function(a, b) {
      const energyPriority = [
        STRUCTURE_SPAWN,
        STRUCTURE_TOWER,
        STRUCTURE_EXTENSION,
          STRUCTURE_STORAGE
      ];
      if (a.structureType == b.structureType)
        return 0;
      const a_priority = energyPriority.indexOf(a.structureType);
      const b_priority = energyPriority.indexOf(b.structureType);
      if (a_priority < b_priority)
        return -1;
      if (a_priority > b_priority)
        return 1;
    }
  },
  memory: {
    clean: function() {
      for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
          delete Memory.creeps[name];
        }
      }
    }
  }
};
