export class Builder {
  private creep: Creep;
  public constructor(creep: Creep) {
    this.creep = creep;
  }

  public Tick(): void {
    if (this.creep.memory.working && this.creep.store[RESOURCE_ENERGY] === 0) {
      this.creep.memory.working = false;
      this.creep.say("🔄 harvest");
    }
    if (
      !this.creep.memory.working &&
      this.creep.store.getFreeCapacity() === 0
    ) {
      this.creep.memory.working = true;
      this.creep.say("🚧 build");
    }

    if (this.creep.memory.working) {
      const targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (this.creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(targets[0], {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      }
    } else {
      const sources = this.creep.room.find(FIND_SOURCES);
      if (sources.length) {
        if (this.creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(sources[0], {
            visualizePathStyle: { stroke: "#ffaa00" },
          });
        }
      }
    }
  }
}
