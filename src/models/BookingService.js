import { Booking } from "./Booking";
import { drivers, tankers } from "./seed";

export class BookingService {
  #list = []; #next = 1; #ver = 0; #subs = new Set();
  constructor() { this.#load(); if (!this.#list.length) this.#seed(); }
  #seed() { this.#list = []; this.#next = 1; this.create("Small", "Gulshan-e-Iqbal", "House 12, Block 5", "Morning"); }
  subscribe = f => { this.#subs.add(f); return () => this.#subs.delete(f); };
  version = () => this.#ver;
  get all() { return this.#list; }
  #emit() { this.#ver++; this.#save(); this.#subs.forEach(f => f()); }
  #save() { try { localStorage.setItem("panigo3", JSON.stringify(this.#list.map(b => ({ id: b.id, size: b.tanker.type, area: b.area, address: b.address, slot: b.slot, pin: b.pin, status: b.status, driver: drivers.indexOf(b.driver) })))); } catch (e) {} }
  #load() { try { const raw = JSON.parse(localStorage.getItem("panigo3") || "[]");
    this.#list = raw.map(r => new Booking(r.id, tankers[r.size], r.area, r.address, r.slot, r.pin).restore(r.status, r.driver >= 0 ? drivers[r.driver] : null));
    this.#next = raw.reduce((m, r) => Math.max(m, r.id), 0) + 1; } catch (e) {} }
  create(size, area, address, slot, pin) {
    if (address.trim().length < 5) throw new Error("err_addr");
    const b = new Booking(this.#next++, tankers[size], area, address.trim(), slot, pin); this.#list.unshift(b); this.#emit(); return b;
  }
  act(fn) { fn(); this.#emit(); }
  reset() { this.#seed(); }
}
export const service = new BookingService();
