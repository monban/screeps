"use strict";
const expect = require('chai').expect;
const controllerTask = require('../dist/controller.tasks.js');

describe('Task Controller', function() {
  const exmaple_tasks = [
      {task: 'create_creep', priority: 5, role: 'bootstrapper'},
      {task: 'do_something', priority: 5},
      {task: 'haul', priority: 5, origin: [3, 5], destination: [5,3]},
      {task: 'create_creep', priority: 4, role: 'upgrader'}
  ];
  const valid_task = Object.freeze({
    task: 'create_creep',
    priority: 3,
    role: 'bootstrapper'
  });

  describe('constructor', function() {
    it('is a function', function() {
      expect(controllerTask).to.be.a('function');
    });
    it('throws an error when called without arguments', function() {
      expect(controllerTask).to.throw();
    });
    it('throws an error when passed something not an array', function() {
      expect(() => {controllerTask('foo')}).to.throw();
    });
    it('does not throw when passed an array', function() {
      expect(() => {controllerTask([])}).to.not.throw();
    });
  });

  describe('push', function() {
    it('is a function', function() {
      const tasks = controllerTask([]);
      expect(tasks.push).to.be.a('function');
    });
    it('adds a task as an object', function() {
      let ary=[];
      controllerTask(ary).push(valid_task);
      expect(ary).to.deep.include(valid_task);
    });
    it('assigns a default priority if none is provided', function() {
      let ary=[];
      let example_task = {task: 'doSomething'};
      controllerTask(ary).push(example_task);
      expect(ary[0].priority).to.equal(5);
    });
  });

  describe('find', function() {
    const low_priority_task = {
      task: 'create_creep',
      priority: 3,
      role: 'upgrader'
    };
    const medium_priority_task = {
      task: 'create_creep',
      priority: 5,
      role: 'hauler'
    };
    const high_priority_task = {
      task: 'create_creep',
      priority: 7,
      role: 'defender'
    };

    let example_ary = [
      medium_priority_task
    ];
    const tasks = controllerTask(example_ary);
    it('is a function', function() {
      expect(tasks.find).to.be.a('function');
    });
    it('does not throw when passed nothing', function() {
      expect(tasks.find).to.not.throw();
    });
    it('does not throw when no result found', function() {
      expect(controllerTask([]).find).to.not.throw();
    });
    it('returns a task', function() {
      expect(tasks.find()).to.eql(medium_priority_task);
    });
    it('still returns the medium task after a lower has been added', function() {
      tasks.push(low_priority_task);
      expect(tasks.find()).to.eql(medium_priority_task);
    });
    it('finds a higher task if in the queue', function() {
      tasks.push(high_priority_task);
      expect(tasks.find()).to.eql(high_priority_task);
    });
  });
});
