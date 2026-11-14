import { useState, useEffect, useSyncExternalStore } from "react";
import { Ctx } from "./context";
import { D } from "./language";
import { AREAS } from "./models/data";
import { service } from "./models/BookingService";
import ResidentView from "./components/ResidentView";
import DispatcherView from "./components/DispatcherView";
import DriverView from "./components/DriverView";

export default function App() {
  useSyncExternalStore(service.subscribe, service.version);
  const [lang, setLang] = useState("en"), [big, setBig] = useState(false), [role, setRole] = useState("res"), [toast, setToast] = useState(null);
  const t = k => D[lang][k] ?? k;
  const rs = n => lang === "ur" ? n.toLocaleString("en-PK") + " " + D.ur.rs : D.en.rs + " " + n.toLocaleString("en-PK");
  useEffect(() => { if (!toast) return; const x = setTimeout(() => setToast(null), 3200); return () => clearTimeout(x); }, [toast]);
  const notify = (k, er, raw) => setToast({ m: raw ? k : t(k), er });
  const roles = [["res", "🏠", "r_res"], ["adm", "📋", "r_adm"], ["drv", "🚚", "r_drv"]];
  return (
    <Ctx.Provider value={{ t, rs, notify, an: id => AREAS[id] ? (lang === "ur" ? AREAS[id].ur : AREAS[id].en) : id }}>
      <div className="app" dir={lang === "ur" ? "rtl" : "ltr"} lang={lang} style={{ fontSize: big ? "1.25rem" : "1.05rem", minHeight: "100vh" }}>
        <header><div className="in">
          <div className="top">
            <div className="brand">💧 PaniGo<small>{t("tag")}</small></div>
            <div className="tools">
              <button className="tool" onClick={() => setLang(lang === "en" ? "ur" : "en")}>{lang === "en" ? "اردو" : "English"}</button>
              <button className="tool" aria-label={t("big")} title={t("big")} onClick={() => setBig(!big)}>{big ? "A-" : "A+"}</button>
            </div>
          </div>
          <div className="roles" role="tablist">{roles.map(([k, e, l]) => <button key={k} className={role === k ? "on" : ""} onClick={() => setRole(k)}><span>{e}</span>{t(l)}</button>)}</div>
        </div></header>
        <main>
          {role === "res" && <ResidentView />}
          {role === "adm" && <><h2>{t("d_title")}</h2><DispatcherView /></>}
          {role === "drv" && <><h2>{t("dv_title")}</h2><DriverView /></>}
          <div className="act" style={{ justifyContent: "center", marginTop: "1.5em" }}><button className="btn sm gh" onClick={() => { service.reset(); notify("reseted"); }}>{t("reset")}</button></div>
        </main>
        {toast && <div className={"toast" + (toast.er ? " er" : "")} role="status">{toast.m}</div>}
      </div>
    </Ctx.Provider>
  );
}
