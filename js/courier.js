/* ================= COURIER (coursier) ================= */
  var kstate = {
    tab: "turno", openStop: -1,
    stops: [
      { n: 1, act: "pickup", addr: "Via Banchi di Sopra 24", win: "10:00–10:30", bags: 2, cust: "M. Dupont", code: "582 914", done: false },
      { n: 2, act: "dropoff", addr: "Hub Waterland \u00b7 Via dei Rossi 94", win: "10:40–11:00", bags: 2, cust: "Deposito giornaliero", code: "\u2014", done: false },
      { n: 3, act: "pickup", addr: "Pensione Palazzo Ravizza", win: "11:15–11:45", bags: 3, cust: "S. Clarke", code: "771 203", done: false },
      { n: 4, act: "pickup", addr: "Via Stalloreggi 41", win: "12:00–12:30", bags: 1, cust: "J. Bianchi", code: "903 118", done: false },
      { n: 5, act: "dropoff", addr: "Stazione FS \u00b7 binario 3", win: "16:00", bags: 2, cust: "M. Dupont", code: "\u2014", done: false }
    ],
    stats: { stops: 0, bags: 0, km: 0, earn: 0 }
  };
  var COUR_TABS = [
    { id: "turno", label: "Turno", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><circle cx="12" cy="12" r="7"/><path d="M12 12 10 9"/></svg>' },
    { id: "mappa", label: "Mappa", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21c-4-4.5-7-8-7-11.5A7 7 0 0 1 12 2a7 7 0 0 1 7 7.5C19 13 16 16.5 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>' },
    { id: "fatti", label: "Fatti", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4.5 12.5 5 5 10-11"/></svg>' }
  ];
  function courSetTab(id) { kstate.tab = id; kstate.openStop = -1; courRender(); }
  function courRender() {
    tabbar.innerHTML = COUR_TABS.map(function(t) {
      return '<div class="tab ' + (kstate.tab === t.id ? "active" : "") + '" onclick="courSetTab(\'' + t.id + '\')">' + t.icon + "<span>" + t.label + "</span></div>";
    }).join("");
    if (kstate.tab === "turno") courTurno();
    else if (kstate.tab === "mappa") courMappa();
    else courFatti();
    content.scrollTop = 0;
  }
  function courTurno() {
    if (kstate.openStop >= 0) return courStopDetail();
    var next = kstate.stops.filter(function(s){ return !s.done; })[0];
    content.innerHTML = "<h1>Turno di oggi</h1><p class='muted' style='margin:4px 0 10px;'>Cargo-bike E-02 \u00b7 10:00\u201316:00 \u00b7 Siena centro</p>" +
      '<div class="stat-strip"><div><b>' + kstate.stats.stops + '/5</b><small>fermate</small></div><div><b>' + kstate.stats.bags + '</b><small>bagagli</small></div><div><b>\u20AC' + kstate.stats.earn.toFixed(0) + '</b><small>guadagno</small></div></div>' +
      '<div class="section-title">Tappa per tappa <span>' + (next ? "Prossima: " + next.win : "Turno completato") + '</span></div>' +
      kstate.stops.map(function(s) {
        return '<div class="stop-card ' + (s.done ? "done" : "") + '" onclick="courOpen(' + (s.n - 1) + ')">' +
          '<div class="stop-num">' + s.n + "</div><div class=\"info\"><b>" + s.addr + "</b><i>" + s.win + " \u00b7 " + s.bags + " bag \u00b7 " + s.cust + "</i></div>" +
          '<span class="act-badge ' + (s.act === "pickup" ? "act-pu" : "act-do") + '">' + (s.act === "pickup" ? "\u25B2 RITIRO" : "\u25BC CONSEGNA") + "</span></div>";
      }).join("");
  }
  function courOpen(i) { var s = kstate.stops[i]; if (s.done) { toast("Tappa gi\u00e0 completata"); return; } kstate.openStop = i; kstate.tab = "turno"; courRender(); }
  function courStopDetail() {
    var s = kstate.stops[kstate.openStop];
    var isPu = s.act === "pickup";
    var steps = isPu
      ? ["Arrivato sul posto", "Verifica codice cliente: " + s.code, "Conta e fotografa i bagagli (" + s.bags + ")", "Applica sigillo SienaBag"]
      : ["Arrivato sul posto", "Consegna " + s.bags + " bagagli", "Verifica firma o codice di ritiro"];
    var html = '<div class="stepper-head"><button class="back-btn" onclick="courClose()">\u2039</button><div class="progress"><i style="width:66%"></i></div></div>' +
      "<h2>Tappa " + s.n + " \u00b7 " + (isPu ? "Ritiro" : "Consegna") + "</h2>" +
      '<p class="muted" style="margin:3px 0 12px;">' + s.addr + " \u00b7 " + s.win + "</p>" +
      '<div class="card">' + steps.map(function(t, i) {
        return '<div class="check-step ' + (i < steps.length - 1 ? "done" : "pending") + '"><div class="cs-dot">' + (i < steps.length - 1 ? "\u2713" : "") + "</div><div>" + t + "</div></div>";
      }).join("") + "</div>" +
      '<div class="card" style="padding:10px 14px;"><div class="ev-row"><div class="ev-time">' + s.bags + "</div><div class=\"info\"><b>bagagli attesi</b><i>peso max 23 kg ciascuno</i></div></div></div>" +
      '<button class="cta" onclick="courDone()">' + (isPu ? "Conferma ritiro" : "Conferma consegna") + "</button>";
    content.innerHTML = html;
  }
  function courDone() {
    var s = kstate.stops[kstate.openStop];
    s.done = true;
    kstate.stats.stops++; kstate.stats.bags += s.bags; kstate.stats.km += 1.8; kstate.stats.earn += 7;
    kstate.openStop = -1; courRender();
    toast("Tappa " + s.n + " completata \u00b7 cliente notificato");
  }
  function courClose() { kstate.openStop = -1; courRender(); }
  function courMappa() {
    var next = kstate.stops.filter(function(s){ return !s.done; })[0];
    var bannerTxt = next ? next.addr + " \u00b7 350 m \u00b7 2 min" : "Turno completato \u2014 rientro al hub";
    content.innerHTML = "<h1>Navigazione</h1><p class='muted' style='margin:4px 0 10px;'>Percorso ottimizzato tra le 5 fermate di oggi.</p>" +
      '<div class="dark-map" style="height:340px;"><svg width="100%" height="100%" viewBox="0 0 340 340" preserveAspectRatio="xMidYMid slice">' +
      '<rect width="340" height="340" fill="#1c2330"/>' +
      '<path d="M0 80 Q100 60 170 90 T340 70" stroke="#2c3648" stroke-width="10" fill="none"/>' +
      '<path d="M0 200 Q120 190 180 210 T340 190" stroke="#2c3648" stroke-width="10" fill="none"/>' +
      '<path d="M80 0 Q90 120 70 220 T90 340" stroke="#2c3648" stroke-width="8" fill="none"/>' +
      '<path d="M240 0 Q230 100 250 200 T230 340" stroke="#2c3648" stroke-width="8" fill="none"/>' +
      '<path d="M60 250 L150 215 L230 150 L150 90 L280 60" stroke="#2456a8" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-dasharray="1 9"/>' +
      circles("60,250", "150,215", "230,150", "150,90", "280,60") +
      "</svg>" +
      '<div class="pulse-dot" style="left:60px;top:250px;"><div class="core"></div></div>' +
      '<div class="map-banner"><div><b style="display:block;font-size:12.5px;">' + bannerTxt + "</b><span style=\"opacity:.7;font-size:10px;\">" + (next ? next.bags + " bagagli da ritirare" : "nessuna tappa residua") + '</span></div><button class="nav-btn" onclick="toast(\'Navigazione simulata\')">Naviga</button></div></div>' +
      '<p class="muted" style="margin-top:10px;text-align:center;">Il percorso raggruppa i ritiri e le consegne per ridurre i chilometri: la rotabilit\u00e0 \u00e8 il cuore del margine.</p>';
  }
  function circles() {
    var out = "";
    for (var i = 0; i < arguments.length; i++) {
      var p = arguments[i].split(",");
      out += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11" fill="#2456a8"/><text x="' + p[0] + '" y="' + (Number(p[1]) + 4) + '" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">' + (i + 1) + "</text>";
    }
    return out;
  }
  function courFatti() {
    var done = kstate.stops.filter(function(s){ return s.done; });
    content.innerHTML = "<h1>Fatto oggi</h1>" +
      '<div class="stat-strip"><div><b>' + kstate.stats.stops + "</b><small>fermate</small></div><div><b>" + kstate.stats.bags + "</b><small>bagagli</small></div><div><b>" + kstate.stats.km.toFixed(1) + "</b><small>km</small></div><div><b>\u20AC" + kstate.stats.earn.toFixed(0) + "</b><small>guadagno</small></div></div>" +
      '<div class="section-title">Storico tappe</div>' +
      (done.length ? '<div class="card" style="padding:6px 14px;">' + done.map(function(s) {
        return '<div class="ev-row"><div class="ev-time">' + s.win + "</div><div class=\"info\"><b>" + s.addr + "</b><i>" + s.bags + " bag \u00b7 " + s.cust + "</i></div><span class=\"chip-ok\">\u2713</span></div>";
      }).join("") + "</div>" : '<div class="card"><p class="muted">Nessuna tappa completata. Apri il turno e conferma la prima tappa per vederla apparire qui.</p></div>') +
      '<button class="cta ghost" onclick="toast(\'Riepilogo giornaliero inviato all\u2019amministratore\')">Chiudi turno</button>';
  }

  
