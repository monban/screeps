"use strict";
const _ = require('lodash');

module.exports = function(tasks) {
  if (!Array.isArray(tasks)) {
    throw 'expected to be passed an array of tasks or empty array';
  }
  return {
    push: function(opts) {
      let new_task = _.assign({priority: 5}, opts);
      tasks.push(new_task);
    },
    find: function() {
      if (tasks.length == 0)
        return null;
      return _.reduce(tasks, (best, task) => {
        if (!best)
          return task
        return best.priority > task.priority ? best : task
      });
    }
  };
};
