import { writeFile } from "node:fs/promises";

const endpoint="https://en.wikipedia.org/w/api.php?action=parse&page=National_Film_Registry&prop=text&format=json&origin=*";
const response=await fetch(endpoint,{headers:{"user-agent":"Videothek collection updater/1.0"}});
if(!response.ok)throw new Error(`Registry source returned ${response.status}`);
const payload=await response.json(),html=payload.parse?.text?.["*"]||"";
const table=[...html.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/gi)].map(match=>match[0]).find(value=>/Year of induction/i.test(value)&&/Film title/i.test(value));
if(!table)throw new Error("National Film Registry table not found");

const decode=value=>value.replace(/&#(\d+);/g,(_,number)=>String.fromCodePoint(Number(number))).replace(/&#x([\da-f]+);/gi,(_,number)=>String.fromCodePoint(Number.parseInt(number,16))).replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&ndash;|&mdash;/g,"-").replace(/&lt;/g,"<").replace(/&gt;/g,">");
const text=value=>decode(value.replace(/<sup\b[^>]*>[\s\S]*?<\/sup>/gi,"").replace(/<br\s*\/?\s*>/gi," ").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim());
const films=[];
for(const row of table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)){
  const cells=[...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(match=>text(match[1]));
  if(cells.length<4)continue;
  const [title,type,releaseLabel,inductionLabel]=cells,releaseYear=releaseLabel.match(/(?:18|19|20)\d{2}/)?.[0],inductionYear=inductionLabel.match(/(?:19|20)\d{2}/)?.[0];
  if(!title||!releaseYear||!inductionYear)continue;
  films.push([title,Number(releaseYear),Number(inductionYear),type,releaseLabel]);
}
if(films.length!==925)throw new Error(`Expected 925 Registry films, received ${films.length}`);
const lines=films.map(record=>JSON.stringify(record));
const output=`window.VIDEOTHEK_NATIONAL_FILM_REGISTRY=(()=>{const films=[\n${lines.join(",\n")}\n];return{version:"2026-10-04.1",snapshotDate:"2026-10-04",source:"https://www.loc.gov/programs/national-film-preservation-board/film-registry/complete-national-film-registry-listing/",edition:"Library of Congress · National Film Registry · selections through 2025",placeholders:films.map(([title,year,inductionYear,type,releaseLabel],index)=>({id:\`national-film-registry-\${String(index+1).padStart(3,"0")}-\${title.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}\`,title,year,inductionYear,sourceOrder:index+1,collectionNumber:String(inductionYear),details:[\`National Film Registry \${inductionYear}\`,type,releaseLabel!==String(year)?\`Jahresangabe: \${releaseLabel}\`:""].filter(Boolean).join(" · "),filmId:"",cover:""}))}})();\n`;
await writeFile(new URL("../videothek-national-film-registry.js",import.meta.url),output,"utf8");
console.log(`Generated ${films.length} National Film Registry entries.`);
