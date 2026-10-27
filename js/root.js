
  /* ================= ROOT ================= */
  var ROLE = { role: "customer" };
  var CLOCKS = { customer: "9:41", partner: "10:07", courier: "11:32", admin: "15:26" };
  var content = document.getElementById("content");
  var tabbar = document.getElementById("tabbar");

  function setRole(r) {
    ROLE.role = r;
    document.getElementById("screen").className = "screen role-" + r;
    document.getElementById("clock").textContent = CLOCKS[r];
    ["customer","partner","courier","admin"].forEach(function(x) {
      document.getElementById("pill-" + x).className = "role-pill" + (x === r ? " on" : "");
    });
    updateLangbar();
    renderAll();
  }

  function renderAll() {
    if (ROLE.role === "customer") custRender();
    else if (ROLE.role === "partner") partRender();
    else if (ROLE.role === "courier") courRender();
    else admRender();
  }

  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    setTimeout(function(){ t.classList.remove("show"); }, 2300);
  }

  

function updateLangbar() {
  var lb = document.getElementById("langbar");
  if (ROLE.role === "customer") { lb.hidden = false; }
  else { lb.hidden = true; }
  ["en","zh","it"].forEach(function(l) {
    document.getElementById("flag-" + l).className = "flag-btn" + (LANG === l ? " on" : "");
  });
}
