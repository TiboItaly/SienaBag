/* ================= CUSTOMER (i18n EN/ZH/IT) ================= */
var state = {
  tab: "home", booking: null,
  flow: { step: 0, service: null, bags: 2, days: 1, slot: null, dropoff: null, address: "" },
  trips: [ demoTrip() ]
};
function demoTrip() {
  return { id: "SB-2481", service: t("svcDelivery"), status: "done", step: 3,
    from: "Via Banchi di Sopra 24", to: t("dropoffLabels").station, bags: 2, slot: "10:00 \u2013 12:00", price: 14, code: "582 914" };
}
function svcName(k) { return k === "storage" ? t("svcStorage") : (k === "delivery" ? t("svcDelivery") : t("svcAirport")); }
function svcSub(k) { return k === "storage" ? t("svcStorageSub") : (k === "delivery" ? t("svcDeliverySub") : t("svcAirportSub")); }
var SERVICES = { storage: { price: "5.50", icon: "S" }, delivery: { price: "14", icon: "D" }, airport: { price: "29", icon: "A" } };
var SLOTS = ["9:00 \u2013 11:00", "10:00 \u2013 12:00", "12:00 \u2013 14:00", "15:00 \u2013 17:00", "17:00 \u2013 19:00"];
var DROPOFFS = {
  storage: [ { id: "gramsci", price: 0 }, { id: "campo", price: 0 }, { id: "station", price: 0 } ],
  delivery: [ { id: "station", price: 0 }, { id: "gramsci", price: 0 }, { id: "hotel", price: 0 } ],
  airport: [ { id: "flo", price: 29 }, { id: "psa", price: 35 } ]
};
function computePrice() {
  var s = state.flow; var svc = s.service;
  if (!svc) return 0;
  var extra = Math.max(0, s.bags - 3);
  if (svc === "storage") return 5.5 * s.bags * s.days;
  if (svc === "delivery") return 14 + extra * 4;
  var d = DROPOFFS.airport.filter(function(x){ return x.id === s.dropoff; })[0];
  return (d ? d.price : 29) + extra * 8;
}
var CUST_TABS = [
  { id: "home", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.8V21h5.5v-5h3v5H19V9.8"/></svg>' },
  { id: "book", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M8 11h8M8 15h5"/></svg>' },
  { id: "trips", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="7" width="14" height="13" rx="3"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>' },
  { id: "host", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21V10l9-6 9 6v11"/><path d="M9 21v-6h6v6"/></svg>' }
];
function custTabLabel(id) { return id === "home" ? t("tabHome") : (id === "book" ? t("tabBook") : (id === "trips" ? t("tabTrips") : t("tabHost"))); }
function custSetTab(id) { state.tab = id; if (id === "book" && state.flow.step === 4) state.flow.step = 0; custRender(); }
function custRender() {
  tabbar.innerHTML = CUST_TABS.map(function(x) {
    return '<div class="tab ' + (state.tab === x.id ? "active" : "") + '" onclick="custSetTab(\'' + x.id + '\')">' + x.icon + "<span>" + custTabLabel(x.id) + "</span></div>";
  }).join("");
  if (state.tab === "home") custHome();
  else if (state.tab === "book") custFlow();
  else if (state.tab === "trips") custTrips();
  else custHost();
  content.scrollTop = 0;
}
function custHome() {
  content.innerHTML =
    "<h1>" + t("hello") + "</h1><p class='muted' style='margin:4px 0 10px;'>" + t("helloSub") + "</p>" +
    '<div class="hero"><span class="badge">' + t("heroBadge") + "</span><h1>" + t("heroTitle") + "</h1>" +
    "<p>" + t("heroSub") + "</p>" +
    '<svg class="towers" width="120" height="90" viewBox="0 0 120 90" fill="#fff"><path d="M20 90V38h18v52z"/><path d="M32 38V20h8v18"/><rect x="26" y="30" width="6" height="6"/><rect x="26" y="46" width="6" height="6"/><rect x="26" y="62" width="6" height="6"/><path d="M70 90V30h22v60z"/><path d="M79 30V12h4v18"/><rect x="74" y="40" width="6" height="6"/><rect x="84" y="40" width="6" height="6"/><rect x="74" y="56" width="6" height="6"/><rect x="84" y="56" width="6" height="6"/><rect x="74" y="72" width="6" height="6"/><rect x="84" y="72" width="6" height="6"/></svg></div>' +
    '<div class="section-title">' + t("services") + "</div>" + custServiceCards() + custTrust() +
    '<div class="section-title">' + t("pointsTitle") + " <span>" + t("seeMap") + "</span></div>" + custMap() +
    '<div style="background:#fffdf9;border:1px solid #eee1cf;border-radius:18px;padding:6px 14px;margin-top:10px;">' +
    custPoint("T", "Tabaccheria la Lizza", "Piazza Gramsci 15A \u00b7 Terminal bus", "4 " + t("walk")) +
    custPoint("W", "Waterland Laundromat", "Via dei Rossi 94 \u00b7 San Francesco", "6 " + t("walk")) +
    custPoint("S", "Bar Duomo d'Oro", "Piazza del Campo", "3 " + t("walk")) + "</div>";
}
function custServiceCards() {
  return Object.keys(SERVICES).map(function(k) {
    return '<div class="service-card" onclick="custChoose(\'' + k + '\')">' +
      '<div class="service-icon">' + SERVICES[k].icon + "</div><div><h3>" + svcName(k) + '</h3><div class="sub">' + svcSub(k) + "</div></div>" +
      '<div class="price-pill">' + t("fromPrice") + SERVICES[k].price + "</div></div>";
  }).join("");
}
function custTrust() {
  return '<div class="trust"><div><b>\u20AC2,500</b>' + t("insured") + '</div><div><b>4.9 \u2605</b>' + t("reviews") + '</div><div><b>6 pts</b>' + t("pts") + "</div></div>";
}
function custMap() {
  return '<div class="map-card"><svg width="100%" height="100%" viewBox="0 0 340 130" preserveAspectRatio="xMidYMid slice">' +
    '<rect width="340" height="130" fill="#efe7d3"/><path d="M0 78 Q60 70 120 82 T230 76 T340 84 V130 H0 Z" fill="#e5d9bd"/>' +
    '<path d="M30 0 Q60 50 40 130" stroke="#dccfa9" stroke-width="9" fill="none"/><path d="M340 10 Q260 60 300 130" stroke="#dccfa9" stroke-width="7" fill="none"/>' +
    '<path d="M120 130 Q160 70 130 0" stroke="#dccfa9" stroke-width="6" fill="none"/><circle cx="170" cy="55" r="34" fill="#d9c9a4" opacity="0.55"/></svg>' +
    pin("18%","52%","#b3552d","Gramsci") + pin("47%","30%","#2e6b3f","Stazione") + pin("66%","44%","#a06a00","Campo") + "</div>";
}
function pin(l, tp, c, label) {
  return '<div class="pin" style="left:' + l + ";top:" + tp + ';"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 0a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6z" fill="' + c + '"/><circle cx="8" cy="6" r="2.3" fill="#fff"/></svg>' + label + "</div>";
}
function custPoint(letter, name, addr, walk) {
  return '<div class="point-row"><div class="dot">' + letter + '</div><div class="info"><b>' + name + "</b><i>" + addr + '</i></div><span class="chip-ok">' + walk + "</span></div>";
}
function custChoose(k) { state.tab = "book"; state.flow = { step: 1, service: k, bags: 2, days: 1, slot: null, dropoff: null, address: "" }; custRender(); }
function custFlow() {
  var f = state.flow;
  if (f.step === 0) { content.innerHTML = "<h1>" + t("bookSvc") + "</h1><p class='muted' style='margin:4px 0 12px;'>" + t("whatNeed") + "</p>" + custServiceCards(); return; }
  var head = '<div class="stepper-head"><button class="back-btn" onclick="custBack()">\u2039</button><div class="progress"><i style="width:' + (f.step * 33.4) + '%"></i></div></div>';
  if (f.step === 1) content.innerHTML = head + custStep1();
  else if (f.step === 2) content.innerHTML = head + custStep2();
  else if (f.step === 3) content.innerHTML = head + custStep3();
  else content.innerHTML = custStep4();
}
function custStep1() {
  var f = state.flow;
  var html = "<h2>" + svcName(f.service) + "</h2><p class='muted' style='margin:3px 0 14px;'>" + svcSub(f.service) + ".</p>";
  if (f.service === "storage") {
    html += '<div class="field"><label>' + t("storagePoint") + "</label>" + custChips(DROPOFFS.storage, "dropoff") + "</div>" +
      '<div class="field"><label>' + t("bags") + '</label><div class="counters"><div class="counter"><button onclick="custBag(-1)">\u2212</button><span>' + f.bags + '</span><button onclick="custBag(1)">+</button></div></div></div>' +
      '<div class="field"><label>' + t("days") + '</label><div class="counters"><div class="counter"><button onclick="custDay(-1)">\u2212</button><span>' + f.days + '</span><button onclick="custDay(1)">+</button></div></div></div>';
  } else {
    html += '<div class="field"><label>' + t("pickupAddress") + '</label><div class="input-mock" onclick="custAddr()">' + (f.address ? f.address : "<span>" + t("addrHint") + "</span>") + "</div></div>" +
      '<div class="field"><label>' + t("bags") + '</label><div class="counters"><div class="counter"><button onclick="custBag(-1)">\u2212</button><span>' + f.bags + '</span><button onclick="custBag(1)">+</button></div></div></div>' +
      '<div class="field"><label>' + t("window") + "</label>" + custSlotChips() + "</div>";
  }
  var ok = f.service === "storage" ? !!f.dropoff : (!!f.slot && !!f.address);
  html += '<button class="cta" onclick="custNext()" style="opacity:' + (ok ? 1 : 0.45) + '">' + (ok ? t("continue") : t("complete")) + "</button>";
  return html;
}
function custStep2() {
  var f = state.flow;
  return "<h2>" + (f.service === "storage" ? t("whereStore") : t("whereDeliver")) + "</h2><p class='muted' style='margin:3px 0 14px;'>" + t("chooseHandover") + "</p>" +
    '<div class="field">' + custChips(DROPOFFS[f.service], "dropoff", true) + "</div>" +
    (f.service === "storage" ? '<div class="field"><label>' + t("returnTime") + "</label>" + custSlotChips() + "</div>" : "") +
    '<button class="cta" onclick="custNext()" style="opacity:' + (f.dropoff ? 1 : 0.45) + '">' + t("reviewPay") + "</button>";
}
function custStep3() {
  var f = state.flow; var p = computePrice();
  var d = DROPOFFS[f.service].filter(function(x){ return x.id === f.dropoff; })[0];
  var bagWord = f.bags > 1 ? t("bagsP") : t("bag");
  var dayWord = f.days > 1 ? t("daysP") : t("day");
  var rows;
  if (f.service === "storage") rows = custSum(svcName(f.service) + " \u00b7 " + f.bags + " " + bagWord + " \u00d7 " + f.days + " " + dayWord, 5.5 * f.bags * f.days) + custSum(t("insurance"), 0);
  else if (f.service === "delivery") rows = custSum(svcName("delivery") + " \u00b7 " + f.bags + " " + bagWord, 14) + (f.bags > 3 ? custSum(t("extraBags") + " (" + (f.bags - 3) + " \u00d7 \u20AC4)", (f.bags - 3) * 4) : "") + custSum(t("insurance"), 0);
  else rows = custSum(svcName("airport") + " \u00b7 " + t("dropoffLabels")[d ? d.id : "flo"], d ? d.price : 29) + (f.bags > 3 ? custSum(t("extraBags") + " (" + (f.bags - 3) + " \u00d7 \u20AC8)", (f.bags - 3) * 8) : "") + custSum(t("insurance"), 0);
  return "<h2>" + t("confirmTitle") + "</h2><p class='muted' style='margin:3px 0 14px;'>" + t("demoPay") + "</p>" +
    '<div class="summary-card">' + custSum(t("sumService"), svcName(f.service)) + (f.address ? custSum(t("sumPickup"), f.address) : "") +
    custSum(t("sumDropoff"), d ? t("dropoffLabels")[d.id] : "\u2014") + (f.slot ? custSum(t("sumWindow"), f.slot) : "") + custSum(t("sumBags"), "" + f.bags) +
    '<div style="height:8px"></div>' + rows +
    '<div class="sum-row total"><span>' + t("sumTotal") + "</span><span>\u20AC" + p.toFixed(2) + "</span></div>" +
    '<div class="insured"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></svg>' + t("insuredNote") + "</div></div>" +
    '<button class="cta" onclick="custConfirm()">' + t("confirmPay") + p.toFixed(2) + "</button>";
}
function custStep4() {
  var b = state.booking;
  return '<div class="success"><div class="check"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2e6b3f" stroke-width="2.6"><path d="m4.5 12.5 5 5 10-11"/></svg></div>' +
    "<h2>" + t("bookingOk") + "</h2><p class='muted' style='margin-top:4px;'>" + b.to + " \u00b7 " + b.slot + "</p>" +
    '<div class="code-box"><div class="code">' + b.code + "</div><p>" + t("showCode") + "</p></div>" +
    '<div class="muted">' + t("smsSent") + "</div><button class=\"cta\" onclick=\"custSetTab('trips')\">" + t("track") + "</button></div>";
}
function custSum(k, v) {
  return '<div class="sum-row"><span>' + k + "</span><span>" + (typeof v === "number" ? "\u20AC" + v.toFixed(2) : v) + "</span></div>";
}
function custChips(list, field, withPrice) {
  return '<div class="chips">' + list.map(function(o) {
    var on = state.flow[field] === o.id ? " on" : "";
    return '<div class="chip' + on + '" onclick="custFlowSet(\'' + field + '\',\'' + o.id + '\')"><b>' + t("dropoffLabels")[o.id] + "</b>" +
      (withPrice && o.price ? "<small>+" + o.price + " \u20AC</small>" : "<small>" + t("dropoffNotes")[o.id] + "</small>") + "</div>";
  }).join("") + "</div>";
}
function custSlotChips() {
  return '<div class="chips">' + SLOTS.map(function(s) {
    return '<div class="chip ' + (state.flow.slot === s ? "on" : "") + '" onclick="custFlowSet(\'slot\',\'' + s + '\')">' + s + "</div>";
  }).join("") + "</div>";
}
function custFlowSet(k, v) { state.flow[k] = v; custRender(); }
function custBag(d) { state.flow.bags = Math.max(1, state.flow.bags + d); custRender(); }
function custDay(d) { state.flow.days = Math.max(1, state.flow.days + d); custRender(); }
function custAddr() { state.flow.address = "Via Banchi di Sopra 24"; custRender(); }
function custNext() {
  var f = state.flow; var ok;
  if (f.step === 1) ok = f.service === "storage" ? !!f.dropoff : (!!f.slot && !!f.address);
  else if (f.step === 2) ok = !!f.dropoff && (f.service !== "storage" || !!f.slot);
  else ok = true;
  if (!ok) { toast(t("missing")); return; }
  f.step = Math.min(3, f.step + 1); custRender();
}
function custBack() { state.flow.step = Math.max(0, state.flow.step - 1); if (state.flow.step === 0) state.tab = "home"; custRender(); }
function custConfirm() {
  var f = state.flow;
  var d = DROPOFFS[f.service].filter(function(x){ return x.id === f.dropoff; })[0];
  state.booking = { id: "SB-" + (2500 + Math.floor(Math.random() * 90)), service: svcName(f.service), status: "active", step: 0,
    from: f.address || t("selfDrop"), to: d ? t("dropoffLabels")[d.id] : "\u2014", bags: f.bags, slot: f.slot || t("flexible"),
    price: computePrice(), code: String(Math.floor(100 + Math.random() * 900)) + " " + String(Math.floor(1000 + Math.random() * 9000)) };
  f.step = 4; custRender(); toast(t("paySim"));
}
function custTrips() {
  var list = state.booking ? [state.booking].concat(state.trips) : state.trips;
  content.innerHTML = "<h1>" + t("myBags") + "</h1>" + list.map(function(b, i) { return custTripCard(b, i === 0 && !!state.booking); }).join("");
}
function custTripCard(b, isNew) {
  var TL = [ { t: t("booked"), i: b.slot }, { t: t("pickedUp"), i: t("pickedUpNote") }, { t: t("inStorage"), i: t("inStorageNote") }, { t: t("delivered"), i: b.to } ];
  var tl = TL.map(function(s, i) {
    var cls = i < b.step ? "done" : (i === b.step ? "now" : "pending");
    return '<div class="tl-step ' + cls + '"><div class="tl-dot"></div><div><b>' + s.t + "</b><i>" + (i <= b.step ? s.i : t("pending")) + "</i></div></div>";
  }).join("");
  return '<div class="bag-card"><div class="top"><b>' + b.service + " \u00b7 " + b.bags + " " + (b.bags > 1 ? t("bagsP") : t("bag")) + '</b><span class="status-tag ' + (b.status === "active" ? "st-active" : "st-done") + '">' + (b.status === "active" ? t("inProgress") : t("delivered")) + "</span></div>" +
    '<p class="muted" style="margin-top:5px;">' + b.from + " \u2192 " + b.to + " \u00b7 \u20AC" + b.price.toFixed(2) + "</p>" +
    '<div class="timeline">' + tl + "</div>" +
    '<div class="code-box" style="padding:12px 14px;"><div class="code" style="font-size:19px;">' + b.code + "</div><p>" + t("handoverCode") + "</p></div>" +
    (isNew ? '<button class="cta" onclick="custAdvance()">' + t("simulate") + "</button>" : "") + "</div>";
}
function custAdvance() {
  var b = state.booking;
  if (b && b.step < 3) { b.step++; custRender(); toast(t("statusDelivered").slice(0,0) + [t("statusPickedUp"), t("statusStored"), t("statusDelivered")][b.step - 1]); }
  else if (b) { b.status = "done"; custRender(); toast(t("bagDelivered")); }
}
function custHost() {
  content.innerHTML = '<div class="host-hero"><h1>' + t("hostTitle") + "</h1><p>" + t("hostSub") + "</p></div>" +
    '<div class="plan"><div class="plan-card"><b>\u20AC0</b><small>' + t("plan0") + "</small></div>" +
    '<div class="plan-card featured"><span class="tag">' + t("planPop") + '</span><b>\u20AC39<small style="font-size:11px">' + t("perMonth") + "</small></b><small>" + t("plan39") + "</small></div></div>" +
    '<div class="section-title">' + t("whatYouGet") + "</div>" +
    '<div class="benefit"><div class="b-ico">\u2713</div><div>' + t("b1") + "</div></div>" +
    '<div class="benefit"><div class="b-ico">\u2713</div><div>' + t("b2") + "</div></div>" +
    '<div class="benefit"><div class="b-ico">\u2713</div><div>' + t("b3") + "</div></div>" +
    '<div class="benefit"><div class="b-ico">\u2713</div><div>' + t("b4") + "</div></div>" +
    '<div class="section-title">' + t("seasonTitle") + "</div>" +
    '<div class="stat-strip"><div><b>27</b><small>' + t("guests") + '</small></div><div><b>4.9\u2605</b><small>' + t("avgRating") + '</small></div><div><b>3</b><small>' + t("mentions") + "</small></div></div>" +
    '<button class="cta" onclick="toast(\'' + t("pilotToast") + '\')">' + t("startPilot") + "</button>";
}
