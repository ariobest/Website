const categories=["Universal","Admin","UI","Utility","Fun","Automation"];
function getScripts(){return JSON.parse(localStorage.getItem("arioScripts")||"null")||[]}
function saveScripts(x){localStorage.setItem("arioScripts",JSON.stringify(x))}
function showPage(id){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active-page"));document.getElementById(id).classList.add("active-page");document.querySelectorAll(".side").forEach(x=>x.classList.toggle("active",x.dataset.page===id));document.getElementById("pageTitle").textContent=id[0].toUpperCase()+id.slice(1);renderAll()}
document.querySelectorAll(".side").forEach(b=>b.onclick=()=>showPage(b.dataset.page));
function renderAll(){
 const s=getScripts();document.getElementById("aScripts").textContent=s.length;document.getElementById("aViews").textContent=s.reduce((a,x)=>a+x.views,0).toLocaleString();document.getElementById("aDownloads").textContent=s.reduce((a,x)=>a+x.downloads,0).toLocaleString();
 document.getElementById("activity").innerHTML=s.slice(-5).reverse().map(x=>`<div><b>${x.name}</b> added to <span class="muted">${x.game}</span></div>`).join("")||"<div class='muted'>No activity yet.</div>";
 renderAdminScripts();renderAdminGames();renderCategories()
}
function renderAdminScripts(){
 const q=(document.getElementById("adminSearch")?.value||"").toLowerCase(),s=getScripts().filter(x=>x.name.toLowerCase().includes(q));
 document.getElementById("adminScripts").innerHTML=`<table class="admin-table"><tr><th>Script</th><th>Game</th><th>Category</th><th>Views</th><th>Action</th></tr>${s.map((x,i)=>`<tr><td><b>${x.name}</b></td><td>${x.game}</td><td>${x.cat}</td><td>${x.views}</td><td><button class="danger" onclick="deleteScript(${i})">Delete</button></td></tr>`).join("")}</table>`
}
function deleteScript(i){const s=getScripts();s.splice(i,1);saveScripts(s);renderAll()}
function openModal(){document.getElementById("modal").classList.add("show")}
function closeModal(){document.getElementById("modal").classList.remove("show")}
function addScript(){
 const s=getScripts();s.push({name:sName.value||"Untitled Script",game:sGame.value||"Universal",cat:sCat.value||"Universal",tags:sTags.value||"",views:0,downloads:0,copies:0,code:sCode.value||""});saveScripts(s);["sName","sGame","sCat","sTags","sCode"].forEach(id=>document.getElementById(id).value="");closeModal();renderAll()
}
function openGameModal(){document.getElementById("gameModal").classList.add("show")}function closeGameModal(){document.getElementById("gameModal").classList.remove("show")}
function addGame(){let gs=JSON.parse(localStorage.getItem("arioGames")||"null")||["Blox Fruits","Brookhaven","Pet Simulator","Murder Mystery"];gs.push(gName.value||"New Game");localStorage.setItem("arioGames",JSON.stringify(gs));closeGameModal();renderAll()}
function renderAdminGames(){const gs=JSON.parse(localStorage.getItem("arioGames")||"null")||["Blox Fruits","Brookhaven","Pet Simulator","Murder Mystery"];document.getElementById("adminGames").innerHTML=gs.map(g=>`<div class="member-row"><b>${g}</b><span>Game</span><button>Active</button></div>`).join("")}
function renderCategories(){document.getElementById("adminCategories").innerHTML=categories.map(c=>`<button>${c}<span>Manage →</span></button>`).join("")}
function saveSettings(){localStorage.setItem("arioSiteName",siteName.value);alert("Settings saved locally.")}
document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("arioLight",document.body.classList.contains("light"))};if(localStorage.getItem("arioLight")==="true")document.body.classList.add("light");renderAll();