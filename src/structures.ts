import * as towers from "./structures.towers";

export function Tick(room: Room): void {
  const structs = room.find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_TOWER },
  });
  const towerList = new Array<StructureTower>();
  structs.forEach((s) => {
    switch (s.constructor) {
      case StructureTower:
        towerList.push(s as StructureTower);
        break;

      default:
        console.log("meet unknow structure:", s);
        break;
    }
  });

  towers.Tick(towerList);
}
