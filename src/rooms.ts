import * as structs from "./structures";

export function Tick(): void {
  for (const name in Game.rooms) {
    const room = Game.rooms[name];
    structs.Tick(room);
  }
}
