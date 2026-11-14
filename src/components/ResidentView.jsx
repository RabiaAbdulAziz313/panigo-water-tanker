import { useState } from "react";
import { useL } from "../context";
import { service } from "../models/BookingService";
import { tankers } from "../models/seed";
import { DISTRICTS, AREA_KM, SLOTS, mapUrl } from "../models/data";
import BookingCard from "./BookingCard";

export default function ResidentView() {
  const { t, rs, notify, an } = useL();
  const [step, setStep] = useState(1), [size, setSize] = useState(null), [area, setArea] = useState(null), [address, setAddress] = useState(""), [slot, setSlot] = useState(null), [dist, setDist] = useState(null), [pin, setPin] = useState(null);
  const next = () => {
    if (step === 1 && !size) return notify("err_size", true);
    if (step === 2 && (!area || !slot || address.trim().length < 5)) return notify("err_fill", true);
    setStep(step + 1);
  };
  const book = () => { try { const b = service.create(size, area, address, slot, pin); notify(t("booked") + b.id, false, true); setStep(1); setSize(null); setArea(null); setSlot(null); setAddress(""); setDist(null); setPin(null); } catch (e) { notify(e.message, true); } };
  const tk = size && tankers[size], km = area && AREA_KM[area];
  const locate = () => { if (!navigator.geolocation) return notify("locfail", true); navigator.geolocation.getCurrentPosition(p => { setPin({ lat: +p.coords.latitude.toFixed(5), lng: +p.coords.longitude.toFixed(5) }); notify("locok"); }, () => notify("locfail", true), { timeout: 8000 }); };
  return (
    <>
      <div className="card">
        <div className="stepper">{[1, 2, 3].map(i => <div key={i} className={"sp" + (step >= i ? " on" : "")}><b>{i}</b>{t("st" + i)}</div>)}</div>
        {step === 1 && <>
          <p className="q">{t("q1")}</p>
          <div className="pick">{Object.values(tankers).map(x => <button key={x.type} className={"big" + (size === x.type ? " on" : "")} onClick={() => setSize(x.type)}>
            <span className="e">{x.type === "Small" ? "🚰" : "🚛"}</span><b>{t(x.type)}</b><span className="mu">{x.gallons} {t("gal")}</span></button>)}</div>
        </>}
        {step === 2 && <>
          <p className="q">📍 {t("q2")}</p>
          <p className="mu">{t("q_dist")}</p>
          <div className="pick3">{Object.keys(DISTRICTS).map(d => <button key={d} className={"big" + (dist === d ? " on" : "")} style={{ minHeight: "3.2em", padding: ".5em .2em" }} onClick={() => { setDist(d); setArea(null); }}><b>{t("dist_" + d)}</b></button>)}</div>
          {dist && <><p className="mu" style={{ marginTop: ".9em" }}>{t("q_area")}</p>
          <div className="pick3">{[...DISTRICTS[dist], "Other"].map(a => <button key={a} className={"big" + (area === a ? " on" : "")} style={{ minHeight: "3em", padding: ".5em .2em" }} onClick={() => setArea(a)}><b>{an(a)}</b></button>)}</div></>}
          <p className="q" style={{ marginTop: "1em" }}>🏠 {t("addr")}</p>
          <input type="text" aria-label={t("addr")} placeholder={t("addrph")} value={address} onChange={e => setAddress(e.target.value)} />
          <div className="act">
            <button className="btn sm gh" type="button" onClick={locate}>📍 {t("myloc")}</button>
            {address.trim().length > 4 && <a className="map" href={mapUrl({ address, area, pin })} target="_blank" rel="noopener noreferrer">🗺️ {t("chk")}</a>}
          </div>
          {pin && <div className="mu">✔ {t("pinned")}</div>}
          <p className="q" style={{ marginTop: "1em" }}>🕒 {t("q2t")}</p>
          <div className="pick3">{Object.entries(SLOTS).map(([k, [e, h]]) => <button key={k} className={"big" + (slot === k ? " on" : "")} onClick={() => setSlot(k)}><span className="e">{e}</span><b>{t(k)}</b><span className="mu">{h}</span></button>)}</div>
        </>}
        {step === 3 && <>
          <p className="q">{t("q3")}</p>
          <div className="sum">
            <div>{size === "Small" ? "🚰" : "🚛"} {t("sa")}: <b>{t(size)} ({tk.gallons} {t("gal")})</b></div>
            <div>📍 {t("sb")}: <b>{an(area)}, {address}{pin ? " 📌" : ""}</b></div>
            <div>{SLOTS[slot][0]} {t("sc")}: <b>{t(slot)} ({SLOTS[slot][1]})</b></div>
            <div className="total">{t("tot")}: {rs(tk.getPrice(km))}</div>
            <div className="mu">{t("fare")}{size === "Large" && km > 10 ? ". " + t("surch") : ""}</div>
          </div>
          <p className="q" style={{ marginTop: ".8em" }}>💵 {t("cash")}</p>
        </>}
        <div className="nav">
          {step > 1 && <button className="btn gh" onClick={() => setStep(step - 1)}>{t("back")}</button>}
          {step < 3 ? <button className="btn" onClick={next}>{t("next")}</button> : <button className="btn ok" onClick={book}>✔ {t("book")}</button>}
        </div>
      </div>
      <h3>{t("mine")}</h3>
      {service.all.length === 0 && <div className="card empty"><span className="e">💧</span>{t("none")}</div>}
      {service.all.map(b => <BookingCard key={b.id} b={b}>
        {b.status === "Pending" && <div className="act"><button className="btn sm er" onClick={() => { try { service.act(() => b.cancel()); notify("cancelled"); } catch (e) { notify(e.message, true); } }}>{t("cancel")}</button></div>}
      </BookingCard>)}
    </>
  );
}
