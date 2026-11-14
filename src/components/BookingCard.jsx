import { useL, STATUS_ICON } from "../context";
import { SLOTS, mapUrl } from "../models/data";

function Progress({ status }) {
  const n = { Pending: 1, Assigned: 2, Delivered: 3 }[status];
  return <div className="dots" aria-hidden="true">{[1, 2, 3].map(i => <i key={i} className={i <= n ? "d" : ""} />)}</div>;
}

export default function BookingCard({ b, children }) {
  const { t, rs, an } = useL();
  const line = b.status === "Assigned" ? t("s_Assigned").replace("{n}", b.driver.name) : t("s_" + b.status);
  return (
    <div className={"card bk " + b.status}>
      <div className="sent"><span className="e">{STATUS_ICON[b.status]}</span>{line}</div>
      {b.status !== "Cancelled" && <Progress status={b.status} />}
      <div className="mu">#{b.id} | {t(b.tanker.type)} ({b.tanker.gallons} {t("gal")}) | {rs(b.price)}</div>
      <div className="mu">📍 {an(b.area)}, {b.address}</div>
      <a className="map" href={mapUrl(b)} target="_blank" rel="noopener noreferrer">🗺️ {t("openmap")}</a>
      <div className="mu">{SLOTS[b.slot][0]} {t(b.slot)} ({SLOTS[b.slot][1]})</div>
      {children}
    </div>
  );
}
