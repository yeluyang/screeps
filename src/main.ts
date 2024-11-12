import * as log from "utils.log";
import * as creeps from "creeps";
import * as rooms from "rooms";
import * as spawns from "spawns";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  // interface Memory {
  //   uuid: number;
  //   log: any;
  // }

  interface CreepMemory {
    role: creeps.Role;
    room: string;
    working: boolean;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  // namespace NodeJS {
  //   interface Global {
  //     log: any;
  //   }
  // }
}

export const loop = () => {
  log.info("new tick start");
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      log.info(`gc creeps mem of ${name}`);
      delete Memory.creeps[name];
    }
  }

  spawns.Tick();
  rooms.Tick();
  creeps.Tick();
};
