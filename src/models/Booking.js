import { AREA_KM } from "./data";

export class Booking {
  #status = "Pending"; #driver = null; // ENCAPSULATION
  constructor(id, tanker, area, address, slot, pin) { Object.assign(this, { id, tanker, area, address, slot, pin: pin || null }); }
  get km() { return AREA_KM[this.area] ?? 10; }
  get status() { return this.#status; }
  get driver() { return this.#driver; }
  get price() { return this.tanker.getPrice(this.km); }
  assign(d) { if (this.#status !== "Pending") throw new Error("err_assigned"); this.#driver = d; this.#status = "Assigned"; }
  deliver() { if (this.#status !== "Assigned") throw new Error("err_nodriver"); this.#status = "Delivered"; }
  cancel() { if (this.#status !== "Pending") throw new Error("err_cancel"); this.#status = "Cancelled"; }
  restore(s, d) { this.#status = s; this.#driver = d; return this; }
}
