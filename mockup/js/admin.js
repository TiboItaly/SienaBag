/* ================= ADMIN ================= */
  var astate = {
    tab: "live", sel: -1,
    orders: [
      { id: "SB-2521", cust: "M. Dupont", svc: "Pickup & Delivery", status: "transito", courier: "Luca B.", price: 14.00, step: 1, to: "Stazione FS \u00b7 16:00" },
      { id: "SB-2519", cust: "S. Clarke", svc: "Airport Transfer", status: "programm\u00e9", courier: "\u2014", price: 29.00, step: 0, to: "Florence FLR \u00b7 15:30" },
      { id: "SB-2516", cust: "A. Rossi", svc: "D\u00e9p\u00f4t", status: "en stock", partner: "Tabaccheria la Lizza", price: 5.50, step: 2, to: "Point la Lizza" },
      { id: "SB-2481", cust: "K. Larsen", svc: "Pickup & Delivery", status: "livré", courier: "Gemma V.", price: 14.00, step: 3, to: "Stazione FS" }
    ],
    partners: [
      { name: "Tabaccheria la Lizza", where: "Piazza Gramsci", used: 14, cap: 20, month: 86 },
      { name: "Waterland", where: "Via dei Rossi", used: 9, cap: 24, month: 64 },
      { name: "Bar Duomo d'Oro", where: "Piazza del Campo", used: 11, cap: 15, month: 52 }
    ],
    couriers: [
      { name: "Luca B.", status: "En tourn\u00e9e", now: "Via Banchi di Sopra 24", done: 2 },
      { name: "Gemma V.", status: "En tourn\u00e9e", now: "Vicolo del Tiratoio", done: 5 },
      { name: "Marta R.", status: "Pause", now: "Hub Waterland", done: 3 }
    ],
    feed: [
      { t: "15:22", m: "SB-2521 collect\u00e9 \u00b7 sigill\u00e9 \u00b7 Luca B." },
      { t: "15:04", m: "Nouveau d\u00e9p\u00f4t accept\u00e9 : la Lizza (2 bagages)" },
      { t: "14:47", m: "Alerte capacit\u00e9 : Bar Duomo d'Oro \u00e0 73%" },
      { t: "14:20", m: "Transfert FLR programm\u00e9 \u00b7 course d\u00e9di\u00e9e \u20AC29" }
    ]
  };
  var ADM_TABS = [
    { id: "live", label: "Live", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>' },
    { id: "ordini", label: "Ordres", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M8 11h8M8 15h5"/></svg>' },
    { id: "partner", label: "Partenaires", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21V10l9-6 9 6v11"/><path d="M9 21v-6h6v6"/></svg>' },
    { id: "team", label: "\u00c9quipe", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5"/><path d="M17 8.5a3 3 0 1 1 2 5"/></svg>' }
  ];
  function admSetTab(id) { astate.tab = id; astate.sel = -1; admRender(); }
  function admRender() {
    tabbar.innerHTML = ADM_TABS.map(function(t) {
      return '<div class="tab ' + (astate.tab === t.id ? "active" : "") + '" onclick="admSetTab(\'' + t.id + '\')">' + t.icon + "<span>" + t.label + "</span></div>";
    }).join("");
    if (astate.tab === "live") admLive();
    else if (astate.tab === "ordini") admOrdini();
    else if (astate.tab === "partner") admPartners();
    else admTeam();
    content.scrollTop = 0;
  }
  function admLive() {
    content.innerHTML = "<h1>Vue temps r\u00e9el</h1><p class='muted' style='margin:4px 0 8px;'>Sienne \u00b7 vendredi \u00b7 saison haute</p>" +
      '<div class="kpi-grid">' +
      '<div class="kpi"><small>En transit</small><b>12</b></div>' +
      '<div class="kpi"><small>En d\u00e9p\u00f4t</small><b>34</b></div>' +
      '<div class="kpi"><small>Coursiers actifs</small><b>3</b></div>' +
      '<div class="kpi"><small>CA du jour</small><b>482 \u20AC</b></div></div>' +
      '<div class="section-title">Carte op\u00e9rationnelle</div>' +
      '<div class="dark-map" style="height:230px;"><svg width="100%" height="100%" viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">' +
      '<rect width="340" height="230" fill="#1c2330"/>' +
      '<path d="M0 60 Q100 45 170 65 T340 50" stroke="#2c3648" stroke-width="9" fill="none"/>' +
      '<path d="M0 140 Q120 130 180 150 T340 130" stroke="#2c3648" stroke-width="9" fill="none"/>' +
      '<path d="M70 0 Q80 90 60 170 T80 230" stroke="#2c3648" stroke-width="7" fill="none"/>' +
      '<path d="M250 0 Q240 70 260 140 T240 230" stroke="#2c3648" stroke-width="7" fill="none"/>' +
      '<circle cx="80" cy="100" r="7" fill="#2e6b3f"/><circle cx="160" cy="150" r="7" fill="#2e6b3f"/><circle cx="240" cy="70" r="7" fill="#2e6b3f"/>' +
      '<circle cx="120" cy="60" r="6" fill="#2456a8"/><circle cx="210" cy="120" r="6" fill="#2456a8"/><circle cx="280" cy="160" r="6" fill="#2456a8"/>' +
      '<circle cx="180" cy="90" r="6" fill="#b3552d"/><circle cx="60" cy="180" r="6" fill="#b3552d"/>' +
      "</svg>" +
      '<div style="position:absolute;top:10px;right:10px;background:rgba(14,19,28,.9);border-radius:10px;padding:8px 10px;font-size:9px;color:#e8eef7;line-height:1.7;">' +
      '<span style="color:#2e6b3f">\u25CF</span> partenaires &nbsp;<span style="color:#2456a8">\u25CF</span> coursiers &nbsp;<span style="color:#b3552d">\u25CF</span> colis</div></div>' +
      '<div class="section-title">Flux d\u2019activit\u00e9</div>' +
      '<div class="card" style="padding:6px 14px;">' + astate.feed.map(function(f) {
        return '<div class="feed-row"><div class="feed-dot"></div><div><b>' + f.t + "</b> \u2014 " + f.m + "</div></div>";
      }).join("") + "</div>" +
      '<button class="cta" onclick="toast(\'Panneau de pilotage complet \u2014 d\u00e9mo\')">Ouvrir le pilotage complet</button>';
  }
  function admOrdini() {
    if (astate.sel >= 0) return admOrderDetail();
    content.innerHTML = "<h1>Ordres du jour</h1><p class='muted' style='margin:4px 0 10px;'>47 unit\u00e9s de service vendues aujourd'hui.</p>" +
      astate.orders.map(function(o, i) {
        return '<div class="card" style="display:flex;align-items:center;gap:10px;cursor:pointer;" onclick="admOpen(' + i + ')">' +
          '<div class="stop-num">' + o.svc[0] + "</div><div class=\"info\"><b style=\"font-size:12.5px;color:#2c1a42;display:block;\">" + o.id + " \u00b7 " + o.cust + "</b>" +
          '<i style="font-style:normal;font-size:10.5px;color:#8d7c66;">' + o.svc + " \u2192 " + o.to + " \u00b7 \u20AC" + o.price.toFixed(2) + "</i></div>" +
          '<span class="st-chip" style="background:var(--soft);color:var(--accent);">' + o.status + "</span></div>";
      }).join("");
  }
  function admOpen(i) { astate.sel = i; admRender(); }
  function admOrderDetail() {
    var o = astate.orders[astate.sel];
    var TL = [ { t: "R\u00e9serv\u00e9", i: o.id + " \u00b7 pay\u00e9 en ligne" }, { t: "Collect\u00e9", i: "Coursier \u00b7 photo + scell\u00e9" }, { t: "En stockage", i: o.partner || "Hub Waterland" }, { t: "Livré", i: o.to } ];
    var tl = TL.map(function(s, i) {
      var cls = i < o.step ? "done" : (i === o.step ? "now" : "pending");
      return '<div class="tl-step ' + cls + '"><div class="tl-dot"></div><div><b>' + s.t + "</b><i>" + (i <= o.step ? s.i : "En attente") + "</i></div></div>";
    }).join("");
    content.innerHTML = '<div class="stepper-head"><button class="back-btn" onclick="admSetTab(\'ordini\')">\u2039</button><div class="progress"><i style="width:100%"></i></div></div>' +
      "<h2>" + o.id + " \u00b7 " + o.cust + "</h2><p class='muted' style='margin:3px 0 12px;'>" + o.svc + " \u2192 " + o.to + "</p>" +
      '<div class="card"><div class="timeline">' + tl + "</div></div>" +
      '<div class="card" style="padding:6px 14px;">' +
      '<div class="adm-row"><div class="info"><b>Prix client</b></div><span style="font-weight:800;color:#2c1a42;">\u20AC' + o.price.toFixed(2) + "</span></div>" +
      '<div class="adm-row"><div class="info"><b>Intervenant</b><i>' + (o.courier || o.partner) + "</i></div><span class=\"st-chip\" style=\"background:var(--soft);color:var(--accent);\">" + o.status + "</span></div></div>" +
      '<button class="cta ghost" onclick="toast(\'R\u00e9affectation simul\u00e9e\')">R\u00e9affecter \u00e0 un autre coursier</button>';
  }
  function admPartners() {
    content.innerHTML = "<h1>Points partenaires</h1><p class='muted' style='margin:4px 0 10px;'>6 points actifs \u00b7 3 \u00e0 recruter (gare nord, Duomo est).</p>" +
      astate.partners.map(function(p) {
        var pct = Math.round(p.used / p.cap * 100);
        return '<div class="card"><div style="display:flex;justify-content:space-between;align-items:baseline;"><b style="font-size:13px;color:#2c1a42;">' + p.name + "</b><span class=\"muted\" style=\"font-size:10px;\">" + p.where + "</span></div>" +
          '<div class="cap-label" style="margin-top:9px;"><span>Occupation</span><span>' + p.used + "/" + p.cap + " (" + pct + "%)</span></div>" +
          '<div class="cap-bar"><i style="width:' + pct + '%"></i></div>' +
          '<div class="stat-strip" style="margin-bottom:0;"><div><b>' + p.month + "</b><small>bagages / mois</small></div><div><b>\u20AC" + (p.month * 5.5 * 0.35).toFixed(0) + "</b><small>quota vers\u00e9e</small></div><div><b>" + (pct > 80 ? "\u26A0" : "\u2713") + "</b><small>" + (pct > 80 ? "capacit\u00e9 tendue" : "capacit\u00e9 ok") + "</small></div></div></div>";
      }).join("");
  }
  function admTeam() {
    content.innerHTML = "<h1>Coursiers</h1><p class='muted' style='margin:4px 0 10px;'>Tourn\u00e9es du jour \u00b7 cargo-bikes et v\u00e9los \u00e9lectriques.</p>" +
      astate.couriers.map(function(c) {
        return '<div class="card" style="display:flex;align-items:center;gap:11px;">' +
          '<div class="stop-num" style="border-radius:50%;">' + c.name[0] + "</div><div class=\"info\"><b style=\"font-size:13px;color:#2c1a42;display:block;\">" + c.name + "</b>" +
          '<i style="font-style:normal;font-size:10.5px;color:#8d7c66;">' + c.now + " \u00b7 " + c.done + " tappe(s) faite(s)</i></div>" +
          '<span class="st-chip" style="background:' + (c.status === "Pause" ? "#fdf1d8;color:#a06a00" : "var(--soft);color:var(--accent)") + ';">' + c.status + "</span></div>";
      }).join("") +
      '<div class="section-title">Recrutement</div>' +
      '<div class="card"><p class="muted">Saison haute : 2 coursiers suppl\u00e9mentaires \u00e0 planifier pour couvrir les pics de juillet et le Palio (16 ao\u00fbt).</p>' +
      '<button class="cta ghost" onclick="toast(\'Offre de mission saisonni\u00e8re pr\u00e9par\u00e9e \u2014 d\u00e9mo\')">Pr\u00e9parer une offre saisonni\u00e8re</button></div>';
  }

  
