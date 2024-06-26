export class Lever {
  id: string;
  position: LeverPositions;

  constructor(id: string, position: LeverPositions) {
    this.id = id;
    this.position = position;
  }
}

export enum LeverPositions {
  POS1 = 'pos-1',
  POS2 = 'pos-2',
  POS3 = 'pos-3',
  POS4 = 'pos-4'
}
