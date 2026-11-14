import { createContext, useContext } from "react";

export const Ctx = createContext();
export const useL = () => useContext(Ctx);
export const STATUS_ICON = { Pending: "⏳", Assigned: "🚚", Delivered: "✅", Cancelled: "✖️" };
