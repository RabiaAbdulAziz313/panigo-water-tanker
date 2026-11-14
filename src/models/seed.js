import { Resident, Admin, Driver } from "./users";
import { SmallTanker, LargeTanker } from "./tankers";

export const resident = new Resident("Ayesha"), admin = new Admin("Bilal");
export const drivers = [new Driver("Imran"), new Driver("Kamran")];
export const tankers = { Small: new SmallTanker(), Large: new LargeTanker() };
