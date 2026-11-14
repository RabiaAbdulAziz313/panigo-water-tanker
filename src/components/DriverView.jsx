import { useState } from "react";
import { useL } from "../context";
import { service } from "../models/BookingService";
import { drivers } from "../models/seed";
import BookingCard from "./BookingCard";

export default function DriverView() {
  const { t, notify } = useL();
  const [di, setDi] = useState(0), d = drivers[di], jobs = service.all.filter(b => b.driver === d);
  return (
    <>
      <p className="q">{t("whoami")}</p>
      <div className="pick" style={{ marginBottom: "1em" }}>{drivers.map((x, i) => <button key={x.name} className={"big" + (di === i ? " on" : "")} style={{ minHeight: "3.4em" }} onClick={() => setDi(i)}><span className="e" style={{ fontSize: "1.5em" }}>🧑‍✈️</span><b>{x.name}</b></button>)}</div>
      {jobs.length === 0 && <div className="card empty"><span className="e">🚚</span>{t("nojobs")}<br />{t("ask")}</div>}
      {jobs.map(b => <BookingCard key={b.id} b={b}>
        {b.status === "Assigned" && <div className="nav"><button className="btn ok" onClick={() => { try { service.act(() => b.deliver()); notify("deliv"); } catch (e) { notify(e.message, true); } }}>✔ {t("deliver")}</button></div>}
      </BookingCard>)}
    </>
  );
}
