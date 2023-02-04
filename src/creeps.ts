import * as role from "creeps.roles";

export enum Role {
  Harvester = "harvester",
  Upgrader = "upgrader",
  Builder = "builder",
}

export function Tick(): void {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    switch (creep.memory.role) {
      case Role.Harvester:
        new role.Harvester(creep).Tick();
        break;
      case Role.Upgrader:
        new role.Upgrader(creep).Tick();
        break;
      case Role.Builder:
        new role.Builder(creep).Tick();
        break;
    }
  }
}
