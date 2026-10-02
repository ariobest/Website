const defaultScripts=[
{name:"Ario Universal",game:"Universal",cat:"Universal",tags:"utility,ui",views:1240,downloads:540,copies:210},
{name:"Blue Hub",game:"Blox Fruits",cat:"UI",tags:"hub,combat",views:982,downloads:410,copies:167},
{name:"Admin Toolkit",game:"Universal",cat:"Admin",tags:"admin,tools",views:764,downloads:301,copies:122},
{name:"Simulator Utils",game:"Pet Simulator",cat:"Utility",tags:"utility,automation",views:621,downloads:245,copies:88},
{name:"Fun Commands",game:"Universal",cat:"Fun",tags:"fun,commands",views:503,downloads:180,copies:74},
{name:"UI Starter",game:"Universal",cat:"UI",tags:"ui,library",views:420,downloads:160,copies:61}
];
const games=["Blox Fruits","Brookhaven","Pet Simulator","Murder Mystery"];
function getScripts(){return JSON.parse(localStorage.getItem("arioScripts")||"null")||defaultScripts}
function saveScripts(x){localStorage.setItem("arioScripts",JSON.stringify(x))}
function render(){
 const s=getScripts(); document.getElementById("scriptCount").textContent=s.length;
 document.getElementById("viewCount").textContent=s.reduce((a,x)=>a+x.views,0).toLocaleString();
 document.getElementById("downloadCount").textContent=s.reduce((a,x)=>a+x.downloads,0).toLocaleString();
 document.getElementById("copyCount").textContent=s.reduce((a,x)=>a+x.copies,0).toLocaleString();
 document.getElementById("favCount").textContent=Math.floor(s.length*14);
 const q=(document.getElementById("searchInput")?.value||"").toLowerCase();
 const shown=s.filter(x=>(x.name+" "+x.game+" "+x.cat+" "+x.tags).toLowerCase().includes(q));
 document.getElementById("scriptGrid").innerHTML=shown.map(x=>`<article class="card"><span class="pill">${x.cat}</span><h3>${x.name}</h3><p class="muted">${x.game}</p><div class="meta"><span>◉ ${x.views.toLocaleString()} views</span><span>↓ ${x.downloads.toLocaleString()}</span></div></article>`).join("")||'<div class="panel">No scripts found.</div>';
 document.getElementById("gameGrid").innerHTML=games.map((g,i)=>`<div class="game"><div class="game-icon">${["⚔","🏠","🐾","🔪"][i]}</div><b>${g}</b><p class="muted">${s.filter(x=>x.game===g).length+3} scripts</p></div>`).join("");
}
function doSearch(){render();document.getElementById("scripts").scrollIntoView()}
function randomScript(){const s=getScripts();const x=s[Math.floor(Math.random()*s.length)];document.getElementById("searchInput").value=x.name;render();document.getElementById("scripts").scrollIntoView()}
function sortPopular(){document.getElementById("searchInput").value="";const s=getScripts().sort((a,b)=>b.views-a.views);saveScripts(s);render()}
function filterCategory(c){document.getElementById("searchInput").value=c;render();document.getElementById("scripts").scrollIntoView()}
function theme(){document.body.classList.toggle("light");localStorage.setItem("arioLight",document.body.classList.contains("light"))}
document.getElementById("themeBtn")?.addEventListener("click",theme); if(localStorage.getItem("arioLight")==="true")document.body.classList.add("light");render();