import { ErrControllerNotExist } from "utils.errno";

export class Upgrader {
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
      this.creep.say("⚡ upgrade");
    }

    if (this.creep.memory.working) {
      if (
        this.creep.upgradeController(
          this.creep.room.controller ?? ErrControllerNotExist()
        ) === ERR_NOT_IN_RANGE
      ) {
        this.creep.moveTo(
          this.creep.room.controller ?? ErrControllerNotExist(),
          {
            visualizePathStyle: { stroke: "#ffffff" },
          }
        );
      }
    } else {
      const sources = this.creep.room.find(FIND_SOURCES);
      if (this.creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(sources[0], {
          visualizePathStyle: { stroke: "#ffaa00" },
        });
      }
    }
  }
}
