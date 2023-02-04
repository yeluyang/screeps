import * as log from "utils.log";

import { Role } from "creeps";

const harvesterLeast = 2;
const upgraderLeast = 1;
const builderLeast = 1;

export class Spawner {
  private spawn: StructureSpawn;
  public constructor(spawn: StructureSpawn) {
    this.spawn = spawn;
  }

  public Spawn(role: Role): ScreepsReturnCode {
    const body = [WORK, CARRY, MOVE];
    const name = `${role}-${Game.time}`;
    log.info(`spawing ${role}: ${name}, ${body}`);
    return this.spawn.spawnCreep(body, name, {
      memory: { role, working: false },
    });
  }

  public Tick(): void {
    if (this.spawn.spawning != null) {
      const spawning = Game.creeps[this.spawn.spawning.name];
      this.spawn.room.visual.text(
        "🛠️" + spawning.memory.role,
        this.spawn.pos.x + 1,
        this.spawn.pos.y,
        {
          align: "left",
          opacity: 0.8,
        }
      );
    }
  }
}

export function Tick(): void {
  let harvesterCount = 0;
  let upgraderCount = 0;
  let builderCount = 0;
  for (const name in Game.creeps) {
    switch (Game.creeps[name].memory.role) {
      case Role.Harvester:
        harvesterCount++;
        break;
      case Role.Upgrader:
        upgraderCount++;
        break;
      case Role.Builder:
        builderCount++;
        break;
    }
  }
  let harvesterGap = harvesterLeast - harvesterCount;
  let upgraderGap = upgraderLeast - upgraderCount;
  let builderGap = builderLeast - builderCount;

  // Game.spawns['Spawn1'].room.controller.activateSafeMode();
  // Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );
  for (const name in Game.spawns) {
    if (Game.spawns[name].spawning != null) continue;
    const spawn = new Spawner(Game.spawns[name]);
    if (harvesterGap > 0 && spawn.Spawn(Role.Harvester) === OK) harvesterGap--;
    else if (upgraderGap > 0 && spawn.Spawn(Role.Upgrader) === OK)
      upgraderGap--;
    else if (builderGap > 0 && spawn.Spawn(Role.Builder) === OK) builderGap--;

    spawn.Tick();
  }
}
