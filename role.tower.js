module.exports = {
  run: function(tower) {
    var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
    if (hostiles) {
      tower.attack(hostiles[0]);
    }
  }
}
