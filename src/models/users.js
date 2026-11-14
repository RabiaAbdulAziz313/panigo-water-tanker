// ABSTRACTION: abstract User
export class User {
  #name; // ENCAPSULATION: private field
  constructor(name) { if (new.target === User) throw new Error("User is abstract"); this.#name = name; }
  get name() { return this.#name; }
  get role() { throw new Error("Not implemented"); }
}
// INHERITANCE: roles extend User
export class Resident extends User { get role() { return "Resident"; } }
export class Admin extends User { get role() { return "Dispatcher"; } }
export class Driver extends User { get role() { return "Driver"; } }
