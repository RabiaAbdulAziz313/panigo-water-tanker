// ABSTRACTION: abstract Tanker
export class Tanker {
  constructor() { if (new.target === Tanker) throw new Error("Tanker is abstract"); }
  get type() { throw new Error("Not implemented"); }
  get gallons() { throw new Error("Not implemented"); }
  get baseFare() { throw new Error("Not implemented"); }
  get perKm() { throw new Error("Not implemented"); }
  getPrice(km) { return this.baseFare + km * this.perKm; }
}
// POLYMORPHISM: same getPrice(), different behaviour
export class SmallTanker extends Tanker { get type() { return "Small"; } get gallons() { return 1000; } get baseFare() { return 1500; } get perKm() { return 50; } }
export class LargeTanker extends Tanker {
  get type() { return "Large"; } get gallons() { return 3000; } get baseFare() { return 3500; } get perKm() { return 80; }
  getPrice(km) { return super.getPrice(km) + (km > 10 ? 500 : 0); }
}
