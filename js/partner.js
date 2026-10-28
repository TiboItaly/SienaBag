/* ================= PARTNER (commerçant) ================= */
  var pstate = {
    tab: "oggi", code: "", found: null, view: "list",
    cap: { used: 14, total: 20 },
    events: [
      { time: "10:15", name: "M. Dupont", bags: 2, svc: "Deposito \u00b7 1 giorno", code: "582 914", type: "in arrivo" },
      { time: "11:40", name: "S. Meyer", bags: 1, svc: "Deposito \u00b7 2 giorni", code: "771 203", type: "in arrivo" },
      { time: "14:30", name: "A. Rossi", bags: 2, svc: "Pickup & Delivery", code: "124 076", type: "da consegnare" }
    ]
  };
  var PBOOKS = {
    "582914": { name: "M. Dupont", bags: 2, svc: "Deposito bagagli \u00b7 1 giorno", action: "checkin", price: 11.00, note: "Il cliente torna domani alle 11:00" },
    "124076": { name: "A. Rossi", bags: 2, svc: "Pickup & Delivery \u2192 Stazione FS", action: "checkout", courier: "Luca B. \u00b7 arrivo ~14:20", price: 14.00 }
  };
  var PART_TABS = [
    { id: "oggi", label: "Oggi", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M8 11h8M8 15h5"/></svg>' },
    { id: "scan", label: "Scansiona", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M4 12h16"/></svg>' },
    { id: "profilo", label: "Profilo", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>' }
  ];
  function partSetTab(id) { pstate.tab = id; pstate.code = ""; pstate.found = null; pstate.view = "list"; partRender(); }
  function partRender() {
    tabbar.innerHTML = PART_TABS.map(function(t) {
      return '<div class="tab ' + (pstate.tab === t.id ? "active" : "") + '" onclick="partSetTab(\'' + t.id + '\')">' + t.icon + "<span>" + t.label + "</span></div>";
    }).join("");
    if (pstate.tab === "oggi") partOggi();
    else if (pstate.tab === "scan") partScan();
    else partProfilo();
    content.scrollTop = 0;
  }
  function partOggi() {
    content.innerHTML =
      '<div class="shop-head"><div class="shop-avatar">L</div><div><b>Tabaccheria la Lizza</b><i>Piazza Gramsci 15A \u00b7 Siena</i></div></div>' +
      '<div class="card"><div class="cap-label"><b>Spazi occupati</b><span>' + pstate.cap.used + " / " + pstate.cap.total + '</span></div>' +
      '<div class="cap-bar"><i style="width:' + (pstate.cap.used / pstate.cap.total * 100) + '%"></i></div>' +
      '<p class="muted" style="margin-top:8px;">La tua capacit\u00e0 \u00e8 verificata in tempo reale: ricevi solo le prenotazioni che puoi accogliere.</p></div>' +
      '<div class="stat-strip"><div><b>' + pstate.cap.used + '</b><small>bagagli in deposito</small></div><div><b>\u20AC18.20</b><small>quota di oggi</small></div><div><b>\u20AC412</b><small>quota del mese</small></div></div>' +
      '<div class="section-title">Movimenti di oggi</div>' +
      '<div class="card" style="padding:6px 14px;">' + pstate.events.map(partEventRow).join("") + "</div>" +
      '<button class="cta" onclick="partSetTab(\'scan\')">Deposita o consegna un bagaglio</button>';
  }
  function partEventRow(e) {
    var tag = e.type === "in arrivo" ? "st-active" : "st-done";
    return '<div class="ev-row"><div class="ev-time">' + e.time + "</div><div class=\"info\"><b>" + e.name + " \u00b7 " + e.bags + " bag" + (e.bags > 1 ? "gli" : "glio") + "</b><i>" + e.svc + " \u00b7 cod. " + e.code + "</i></div>" +
      '<span class="status-tag ' + tag + '">' + e.type + "</span></div>";
  }
  function partScan() {
    if (pstate.found) return partFound();
    content.innerHTML = "<h2>Scansiona o inserisci il codice</h2>" +
      '<p class="muted" style="margin:3px 0 6px;">QR del cliente o codice a 6 cifre.</p>' +
      '<div class="qr-frame"><span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span><div class="scanline"></div></div>' +
      '<p class="muted" style="text-align:center;margin-bottom:4px;">Oppure digita il codice</p>' +
      '<div class="code-slots">' + [0,1,2,3,4,5].map(function(i) { return '<div class="slot">' + (pstate.code[i] || "") + "</div>"; }).join("") + "</div>" +
      '<div class="keypad">' + ["1","2","3","4","5","6","7","8","9"].map(function(d) { return '<div class="key" onclick="pKey(\'' + d + '\')">' + d + "</div>"; }).join("") +
      '<div class="key fn" onclick="pKey(\'x\')"> Cancella </div><div class="key" onclick="pKey(\'0\')">0</div><div class="key fn" onclick="pSearch()"> Cerca </div></div>' +
      '<p class="muted" style="text-align:center;margin-top:12px;">Demo: prova 582914 (deposito) o 124076 (consegna)</p>';
  }
  function pKey(d) {
    if (d === "x") pstate.code = pstate.code.slice(0, -1);
    else if (pstate.code.length < 6) pstate.code += d;
    partScan();
  }
  function pSearch() {
    var b = PBOOKS[pstate.code];
    if (!b) { toast("Codice non trovato \u2014 prova 582914 o 124076"); return; }
    pstate.found = b; partRender();
  }
  function partFound() {
    var b = pstate.found;
    var btn = b.action === "checkin"
      ? '<button class="cta" onclick="pDone(true)">Accetta e deposita</button>'
      : '<button class="cta" onclick="pSig()">Consegna \u2013 firma cliente</button>';
    content.innerHTML =
      '<div class="stepper-head"><button class="back-btn" onclick="pReset()">\u2039</button><div class="progress"><i style="width:50%"></i></div></div>' +
      '<div class="code-box"><div class="code">' + pstate.code.slice(0,3) + " " + pstate.code.slice(3) + "</div><p>Codice verificato \u00b7 prenotazione trovata</p></div>" +
      '<div class="card"><b style="font-size:15px;color:var(--accent-ink);">' + b.name + "</b>" +
      '<p class="muted" style="margin-top:5px;">' + b.svc + "</p>" +
      '<div class="stat-strip"><div><b>' + b.bags + "</b><small>bagagli</small></div><div><b>\u20AC" + b.price.toFixed(2) + "</b><small>totale cliente</small></div><div><b>\u20AC" + (b.price * 0.35).toFixed(2) + "</b><small>la tua quota</small></div></div>" +
      (b.action === "checkin" ? '<p class="muted">' + b.note + "</p>" : '<p class="muted">Corriere assegnato: ' + b.courier + "</p>") + "</div>" + btn;
  }
  function pSig() {
    content.innerHTML =
      '<div class="stepper-head"><button class="back-btn" onclick="pReset()">\u2039</button><div class="progress"><i style="width:80%"></i></div></div>' +
      "<h2>Firma del cliente</h2><p class='muted' style='margin:3px 0 12px;\">Il cliente firma la consegna direttamente sullo schermo.</p>" +
      '<div class="sig-wrap"><canvas id="sigpad" width="300" height="120"></canvas></div>' +
      '<button class="cta ghost" onclick="pSig()">Cancella</button>' +
      '<button class="cta" onclick="pSigConfirm()">Conferma consegna</button>';
    initSig();
  }
  var sigDrawn = false;
  function initSig() {
    sigDrawn = false;
    var c = document.getElementById("sigpad"); if (!c) return;
    var ctx = c.getContext("2d"); ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.strokeStyle = "#173a24";
    var drawing = false;
    function pos(e) { var r = c.getBoundingClientRect(); return { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) }; }
    c.addEventListener("pointerdown", function(e) { drawing = true; sigDrawn = true; var p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
    c.addEventListener("pointermove", function(e) { if (!drawing) return; e.preventDefault(); var p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); });
    window.addEventListener("pointerup", function() { drawing = false; });
  }
  function pSigConfirm() {
    if (!sigDrawn) { toast("Firma mancante \u2014 traccia sul riquadro"); return; }
    pDone(false);
  }
  function pDone(checkin) {
    if (checkin) { pstate.cap.used += pstate.found.bags; }
    else { pstate.cap.used = Math.max(0, pstate.cap.used - pstate.found.bags); }
    var msg = checkin ? "Bagagli registrati, sigillati e assicurati" : "Consegna registrata \u2014 cliente firmato";
    pstate.found = null; pstate.code = "";
    content.innerHTML = '<div class="success"><div class="check"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2e6b3f" stroke-width="2.6"><path d="m4.5 12.5 5 5 10-11"/></svg></div>' +
      "<h2>Fatto!</h2><p class='muted' style='margin-top:4px;'>" + msg + ".</p>" +
      '<div class="code-box"><p>Etichette e registro aggiornati \u00b7 quota accreditata istantaneamente</p></div>' +
      '<button class="cta" onclick="partSetTab(\'oggi\')">Torna a Oggi</button></div>';
    toast("Operazione registrata");
  }
  function pReset() { pstate.found = null; pstate.code = ""; partScan(); }
  function partProfilo() {
    content.innerHTML =
      '<div class="shop-head"><div class="shop-avatar">L</div><div><b>Tabaccheria la Lizza</b><i>Punto partner dal 2027 \u00b7 ID P-007</i></div></div>' +
      '<div class="card"><div class="cap-label"><b>Capacit\u00e0 giornaliera</b><span>' + pstate.cap.total + " bagagli</span></div>" +
      '<div class="counters"><div class="counter"><button onclick="pCap(-1)">\u2212</button><span>' + pstate.cap.total + "</span><button onclick=\"pCap(1)\">+</button></div></div>" +
      '<p class="muted" style="margin-top:8px;">Pi\u00f9 spazio = pi\u00f9 prenotazioni accettate = pi\u00f9 quota.</p></div>' +
      '<div class="section-title">Le tue condizioni</div>' +
      '<div class="card" style="padding:6px 14px;">' +
      '<div class="ev-row"><div class="info"><b>Quota per bagaglio</b><i>35% del prezzo \u00b7 accreditata ogni settimana</i></div><span class="chip-ok">Attivo</span></div>' +
      '<div class="ev-row"><div class="info"><b>Assicurazione</b><i>\u20AC2.500 per bagaglio \u00b7 polizza SienaBag</i></div><span class="chip-ok">Attiva</span></div>' +
      '<div class="ev-row"><div class="info"><b>Periodo di prova</b><i>Recedibile con 30 giorni di preavviso</i></div><span class="chip-ok">Mese 1</span></div>' +
      "</div>" +
      '<div class="stat-strip"><div><b>86</b><small>bagagli nel mese</small></div><div><b>\u20AC412</b><small>quota del mese</small></div><div><b>4.8\u2605</b><small>recensioni punto</small></div></div>';
  }
  function pCap(d) { pstate.cap.total = Math.max(6, pstate.cap.total + d); if (pstate.cap.used > pstate.cap.total) pstate.cap.used = pstate.cap.total; partProfilo(); }

  
