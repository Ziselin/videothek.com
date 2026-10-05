import{writeFile}from"node:fs/promises";
const url="https://raw.githubusercontent.com/onttm/stevenlu-lists/main/World_Cinema_Project_2026-01-20.md",response=await fetch(url);
if(!response.ok)throw new Error(`WCP source returned ${response.status}`);
const markdown=await response.text(),records=[];
const normalize=value=>String(value||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^\p{L}\p{N}]+/gu," ").trim().toLocaleLowerCase("en-US");
for(const line of markdown.split(/\r?\n/)){
  const cells=line.split("|").slice(1,-1).map(value=>value.trim());
  if(cells.length!==6||!/^(18|19|20)\d{2}$/.test(cells[4]))continue;
  const rawTitle=cells[0].replace(/\s*¹\s*$/,"").trim(),originalTitle=cells[1],parenthetical=rawTitle.match(/^(.+?)\s+\(([^()]+)\)$/u),title=parenthetical&&normalize(parenthetical[1])===normalize(originalTitle)?parenthetical[2].trim():(parenthetical?parenthetical[1].trim():rawTitle);
  records.push([title,originalTitle,Number(cells[4]),cells[2],cells[3],cells[5]==="—"?"":Number(cells[5]),/¹/.test(cells[0])]);
}
if(records.length!==70)throw new Error(`Expected 70 WCP films, received ${records.length}`);
const output=`window.VIDEOTHEK_WORLD_CINEMA_PROJECT=(()=>{const films=[\n${records.map(value=>JSON.stringify(value)).join(",\n")}\n];return{version:"2026-10-05.1",snapshotDate:"2026-10-05",source:"https://www.film-foundation.org/world-cinema",edition:"The Film Foundation · World Cinema Project",placeholders:films.map(([title,originalTitle,year,director,country,restorationYear,shortFilm],index)=>({id:\`world-cinema-project-\${String(index+1).padStart(3,"0")}-\${title.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}\`,title,originalTitle:originalTitle!==title?originalTitle:"",year,director,countries:country,restorationYear,sourceOrder:index+1,collectionNumber:String(index+1),details:[country,director,restorationYear?\`Restauriert \${restorationYear}\`:"World Cinema Project",shortFilm?"Kurzfilm / Wochenschau":""].filter(Boolean).join(" · "),filmId:"",cover:""}))}})();\n`;
await writeFile(new URL("../videothek-world-cinema-project.js",import.meta.url),output,"utf8");
console.log(`Generated ${records.length} World Cinema Project entries.`);
