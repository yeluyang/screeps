export class Tower {
  private tower: StructureTower;
  public constructor(tower: StructureTower) {
    this.tower = tower;
  }

  public Tick(): void {
    const closestDamagedStructure = this.tower.pos.findClosestByRange(
      FIND_STRUCTURES,
      {
        filter: (structure) => structure.hits < structure.hitsMax,
      }
    );
    if (closestDamagedStructure) {
      this.tower.repair(closestDamagedStructure);
    }

    const closestHostile =
      this.tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      this.tower.attack(closestHostile);
    }
  }
}

export function Tick(towers: StructureTower[]): void {
  towers.forEach((t) => new Tower(t).Tick());
}
