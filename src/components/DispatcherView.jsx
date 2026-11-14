import { useState } from "react";
import { useL } from "../context";
import { service } from "../models/BookingService";
import { drivers } from "../models/seed";
import BookingCard from "./BookingCard";

export default function DispatcherView() {
  const { t, rs, notify } = useL();
  const [f, setF] = useState("All"), [pick, setPick] = useState({});
  const all = service.all, c = s => all.filter(b => b.status === s).length;
  const list = f === "All" ? all : all.filter(b => b.status === f);
  const earned = all.filter(b => b.status === "Delivered").reduce((s, b) => s + b.price, 0);
  return (
    <>
      <div className="stats">
        <div className="stat">⏳<b>{c("Pending")}</b><span className="mu">{t("d_p")}</span></div>
        <div className="stat">🚚<b>{c("Assigned")}</b><span className="mu">{t("d_a")}</span></div>
        <div className="stat">✅<b>{c("Delivered")}</b><span className="mu">{t("d_d")}</span></div>
        <div className="stat">💵<b style={{ fontSize: "1.1em" }}>{rs(earned)}</b><span className="mu">{t("d_e")}</span></div>
      </div>
      <div className="chips">{["All", "Pending", "Assigned", "Delivered", "Cancelled"].map(s => <button key={s} className={f === s ? "on" : ""} onClick={() => setF(s)}>{t(s)}</button>)}</div>
      {list.length === 0 && <div className="card empty"><span className="e">📋</span>{t("none")}</div>}
      {list.map(b => <BookingCard key={b.id} b={b}>
        {b.status === "Pending" && <div className="act">
          <select aria-label={t("r_drv")} value={pick[b.id] ?? 0} onChange={e => setPick({ ...pick, [b.id]: Number(e.target.value) })}>{drivers.map((d, i) => <option key={d.name} value={i}>{d.name}</option>)}</select>
          <button className="btn sm" onClick={() => { try { service.act(() => b.assign(drivers[pick[b.id] ?? 0])); notify("assigned"); } catch (e) { notify(e.message, true); } }}>{t("assign")}</button>
        </div>}
      </BookingCard>)}
    </>
  );
}
