/* Automatically derived archive folders. They are views, never additional storage. */
const AUTOMATIC_ALL_FILMS_ID="automatic-all-films";
const AUTOMATIC_WATCHLIST_ID="automatic-watchlist";
const AUTOMATIC_SERIES_ID="automatic-series";
const AUTOMATIC_HARDCOPIES_ID="automatic-hardcopies";
const WATCHLIST_STORAGE_KEY="videothek-watchlist-v1";
const AUTOMATIC_ARCHIVE_IDS=new Set([AUTOMATIC_ALL_FILMS_ID,AUTOMATIC_WATCHLIST_ID,AUTOMATIC_SERIES_ID,AUTOMATIC_HARDCOPIES_ID,LIST_CATALOG_PROJECT_ID]);
let automaticArchiveCache={signature:"",projects:new Map()};
let watchlistRevision=0;
let watchlistEntries=loadWatchlistEntries();

function loadWatchlistEntries(){
  try{
    const stored=JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY)||"[]"),seen=new Set();
    if(!Array.isArray(stored))return[];
    return stored.map(entry=>typeof entry==="object"&&entry?entry:{id:entry,addedAt:""}).map(entry=>({id:String(entry.id||"").trim(),addedAt:String(entry.addedAt||"")})).filter(entry=>entry.id&&!seen.has(entry.id)&&seen.add(entry.id))
  }catch(error){console.warn("Watchlist konnte nicht geladen werden.",error);return[]}
}
function watchlistHas(filmId){return watchlistEntries.some(entry=>sameId(entry.id,filmId))}
function persistWatchlist(){
  try{localStorage.setItem(WATCHLIST_STORAGE_KEY,JSON.stringify(watchlistEntries))}catch(error){console.warn("Watchlist konnte nicht lokal gespeichert werden.",error);return false}
  Promise.resolve(window.NeonVStorage?.setSetting?.("watchlistEntries",watchlistEntries)).catch(error=>console.warn("Watchlist konnte nicht im Archivspeicher gesichert werden.",error));
  return true
}
function watchlistFilms(){
  const lookup=playlistFilmLookup(projects);
  return watchlistEntries.map(entry=>lookup.byId.get(String(entry.id))).filter(Boolean)
}

function isAutomaticArchiveProject(id){return AUTOMATIC_ARCHIVE_IDS.has(String(id||""))}
function automaticArchiveSourceProjects(){return projects.filter(project=>!sameId(project.id,LIST_CATALOG_PROJECT_ID))}
function automaticArchiveFilmKey(film){
  const type=filmMediaType(film),tmdb=String(film?.tmdbId||"").trim(),imdb=String(film?.imdbId||"").trim().toLowerCase(),wikidata=String(film?.wikidataId||"").trim().toLowerCase();
  return tmdb?`${type}:tmdb:${tmdb}`:imdb?`${type}:imdb:${imdb}`:wikidata?`${type}:wikidata:${wikidata}`:`${type}:local:${String(film?.id||"")}`
}
function mergedAutomaticArchiveFilms(){
  const films=new Map();
  automaticArchiveSourceProjects().forEach(project=>(project.films||[]).forEach(film=>{
    const key=automaticArchiveFilmKey(film);
    if(!key)return;
    const stored=films.get(key);
    if(!stored){films.set(key,film);return}
    const copies=mergeCopyCollections(filmCopies(stored),filmCopies(film));
    films.set(key,{...stored,copies,link:copies[0]?.link||stored.link||"",status:copies[0]?.status||stored.status||"nicht verfügbar"});
  }));
  return [...films.values()]
}
function automaticArchiveProjects(){
  const signature=`${stateRevision}:${watchlistRevision}:${projects.length}:${projects.reduce((sum,project)=>sum+(project.films||[]).length,0)}`;
  if(automaticArchiveCache.signature===signature)return automaticArchiveCache.projects;
  const merged=mergedAutomaticArchiveFilms(),all=merged.filter(film=>filmMediaType(film)==="movie"&&filmCopies(film).length),series=merged.filter(film=>filmMediaType(film)==="tv"),hardcopies=merged.map(film=>{
    const copies=filmCopies(film).filter(copyIsPhysical);
    if(!copies.length)return null;
    return{...film,copies,link:"",status:copies.some(copy=>normalizedCopyStatus(copy.status)!=="nicht verfügbar")?"verfügbar":"nicht verfügbar"}
  }).filter(Boolean),catalog=projects.find(project=>sameId(project.id,LIST_CATALOG_PROJECT_ID));
  const derived=[
    {id:AUTOMATIC_ALL_FILMS_ID,name:"Alle Filme",description:"Alle Filme mit vorhandenen Fassungen.",films:all,automatic:true},
    {id:AUTOMATIC_WATCHLIST_ID,name:"Watchlist",description:"Filme, die du dir noch ansehen möchtest.",films:watchlistFilms(),automatic:true},
    {id:AUTOMATIC_SERIES_ID,name:"Serien",description:"Alle Serieneinträge aus deinen Projekten.",films:series,automatic:true},
    {id:AUTOMATIC_HARDCOPIES_ID,name:"Hardcopies",description:"Alle physischen Fassungen wie DVD, Blu-ray und weitere Datenträger.",films:hardcopies,automatic:true}
  ];
  const map=new Map(derived.map(project=>[project.id,project]));
  if(catalog)map.set(LIST_CATALOG_PROJECT_ID,{...catalog,automatic:true,description:catalog.description||"Noch nicht zugeordnete Einträge aus Listen."});
  automaticArchiveCache={signature,projects:map};
  return map
}
function archiveProjectById(id){return automaticArchiveProjects().get(String(id||""))||projects.find(project=>sameId(project.id,id))}
function automaticProjectRow(project,{exportable=true}={}){
  const active=sameId(project.id,activeProjectId),menuId=`automatic-project-actions-${project.id}`;
  return `<div class="project-row archive-list-row archive-list-row-project automatic-project-row${active?" is-active":""}${exportable?"":" is-readonly"}"><button class="project-item" type="button" data-automatic-project-id="${esc(project.id)}" ${active?'aria-current="true"':""}><span>${esc(project.name)}</span><small class="archive-list-count" aria-label="${project.films.length} ${project.films.length===1?"Film":"Filme"}">${project.films.length}</small></button><div class="project-row-menu-wrap"><button class="project-row-menu-button" type="button" data-project-row-menu="${esc(project.id)}" aria-label="Menü für ${esc(project.name)} öffnen" aria-controls="${menuId}" aria-expanded="false">⋮</button><div id="${menuId}" class="project-row-menu project-actions-menu" data-project-row-popup="${esc(project.id)}" role="menu" aria-label="Aktionen für ${esc(project.name)}" hidden><div class="project-actions-menu-title"><span>Automatischer Ordner</span><strong>${esc(project.name)}</strong></div><button type="button" role="menuitem" data-export-project="${esc(project.id)}"><span>Ordner exportieren</span></button></div></div></div>`
}
function renderAutomaticArchiveProjects(){
  const list=document.getElementById("automaticProjectList"),section=document.getElementById("automaticProjectSection"),count=document.getElementById("automaticProjectSectionCount");
  if(!list)return;
  const folders=automaticArchiveProjects(),catalog=folders.get(LIST_CATALOG_PROJECT_ID),ordered=[folders.get(AUTOMATIC_ALL_FILMS_ID),folders.get(AUTOMATIC_WATCHLIST_ID),folders.get(AUTOMATIC_SERIES_ID),folders.get(AUTOMATIC_HARDCOPIES_ID),catalog].filter(Boolean);
  list.innerHTML=ordered.map(project=>automaticProjectRow(project,{exportable:!sameId(project.id,LIST_CATALOG_PROJECT_ID)})).join("");
  if(count)count.textContent=String(ordered.length);
  if(section&&isAutomaticArchiveProject(activeProjectId))section.open=true;
  els.projectList.querySelector(`[data-project-drag="${CSS.escape(LIST_CATALOG_PROJECT_ID)}"]`)?.remove();
  if(els.projectSectionCount)els.projectSectionCount.textContent=String(automaticArchiveSourceProjects().length)
}
function syncAutomaticArchiveControls(){
  const automatic=isAutomaticArchiveProject(activeProjectId);
  els.machineView.dataset.automaticProject=String(automatic);
  const eyebrow=els.projectsContent.querySelector(".machine-project-heading .eyebrow");
  if(eyebrow)eyebrow.textContent=automatic?"Automatische Ablage":"Projektbestand"
}

const activeProjectBeforeAutomaticArchive=activeProject;
activeProject=function(){return archiveProjectById(activeProjectId)||activeProjectBeforeAutomaticArchive()};
const renderBeforeAutomaticArchive=render;
render=function(...args){const result=renderBeforeAutomaticArchive(...args);renderAutomaticArchiveProjects();syncAutomaticArchiveControls();return result};
const renderSelectedProjectBeforeAutomaticArchive=renderSelectedProject;
renderSelectedProject=function(){renderSelectedProjectBeforeAutomaticArchive();renderAutomaticArchiveProjects();syncAutomaticArchiveControls()};
const selectProjectBeforeAutomaticArchive=selectProject;
selectProject=function(id){
  if(!isAutomaticArchiveProject(id))return selectProjectBeforeAutomaticArchive(id);
  if(currentView==="cinema")return;
  activeProjectId=String(id);archiveSearchQuery="";els.searchInput.value="";persistActiveProjectSelection();renderSelectedProject()
};
const archiveRowMarkupBeforeAutomaticArchive=archiveRowMarkup;
archiveRowMarkup=function(film,projectId){
  if(!isAutomaticArchiveProject(projectId))return archiveRowMarkupBeforeAutomaticArchive(film,projectId);
  const copies=availabilityCopies(film),linkedCopies=copies.filter(copy=>String(copy.link||"").trim()),status=filmAvailabilityStatus(film),linkDisplay=linkedCopies.length?`<button class="archive-link-count" type="button" data-archive-film-detail="${esc(film.id)}" aria-label="${linkedCopies.length} ${linkedCopies.length===1?"Link":"Links"} zu ${esc(film.title)} anzeigen" title="Fassungen anzeigen">${linkedCopies.length}</button>`:"—",watchlistCheck=sameId(projectId,AUTOMATIC_WATCHLIST_ID)?`<label class="watchlist-row-check" title="Von der Watchlist entfernen"><input type="checkbox" data-watchlist-complete="${esc(film.id)}" aria-label="${esc(film.title)} von der Watchlist entfernen"><span aria-hidden="true"></span></label>`:"";
  return `<tr><td><div class="title-cell">${watchlistCheck}<span class="film-drag-handle is-locked" title="Automatisch einsortiert">${cover(film,true)}</span><button class="archive-film-title" type="button" data-archive-film-detail="${esc(film.id)}" title="${esc(film.title)} öffnen">${esc(film.title)}</button></div></td><td>${esc(film.year||"—")}</td><td>${linkDisplay}</td><td>${archiveEditableRatingMarkup(film)}</td><td><span class="status" data-status="${esc(status)}">${status==="verfügbar"?"geprüft":esc(status)}</span></td><td><div class="film-row-actions"><button class="row-menu" type="button" data-edit-film="${esc(film.id)}" aria-label="${esc(film.title)} bearbeiten">•••</button></div></td></tr>`
};
const openExportDialogBeforeAutomaticArchive=openExportDialog;
openExportDialog=function(projectId=activeProjectId){
  if(!isAutomaticArchiveProject(projectId))return openExportDialogBeforeAutomaticArchive(projectId);
  if(sameId(projectId,LIST_CATALOG_PROJECT_ID))return;
  const project=archiveProjectById(projectId);if(!project)return;
  pendingExportProjectId=String(project.id);const availability=exportAvailability(project);
  $("exportSummary").textContent=`„${project.name}“ enthält ${project.films.length} ${project.films.length===1?"Film":"Filme"}. Davon ${availability.publicFilms===1?"ist":"sind"} ${availability.publicFilms} mit ${availability.publicCopies} frei zugänglichen ${availability.publicCopies===1?"Fassung":"Fassungen"} teilbar.`;
  $("exportForm").elements.exportScope.value="all";$("exportDialog").showModal()
};
const exportProjectBeforeAutomaticArchive=exportProject;
exportProject=function(scope,projectId=pendingExportProjectId||activeProjectId){
  if(!isAutomaticArchiveProject(projectId))return exportProjectBeforeAutomaticArchive(scope,projectId);
  if(!scope){openExportDialog(projectId);return}
  const source=archiveProjectById(projectId);pendingExportProjectId="";if(!source||sameId(source.id,LIST_CATALOG_PROJECT_ID))return;
  const isPublic=scope==="public",project=isPublic?publicExportProject(source):structuredClone(source);delete project.automatic;
  const payload={format:"videothek-project",version:2,exportScope:isPublic?"public":"complete",exportedAt:new Date().toISOString(),project},blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),a=document.createElement("a"),base=source.name.toLowerCase().replace(/[^a-z0-9äöüß]+/gi,"-")||"videothek-ordner";
  a.href=URL.createObjectURL(blob);a.download=`${base}${isPublic?"-oeffentlich":""}.videothek.json`;a.click();URL.revokeObjectURL(a.href);toast(`„${source.name}“ exportiert`)
};

function watchlistButtonMarkup(film){
  const active=watchlistHas(film.id),label=active?"Von der Watchlist entfernen":"Zur Watchlist hinzufügen";
  return `<button class="watchlist-toggle${active?" is-active":""}" type="button" data-watchlist-film-id="${esc(film.id)}" aria-pressed="${active}" aria-label="${label}" title="${label}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.75 4.75c0-1.1.9-2 2-2h6.5c1.1 0 2 .9 2 2v16.1L12 17.55l-5.25 3.3V4.75Z"/></svg></button>`
}
const catalogCardMarkupBeforeWatchlist=catalogCardMarkup;
catalogCardMarkup=function(film){return catalogCardMarkupBeforeWatchlist(film).replace("</article>",`${watchlistButtonMarkup(film)}</article>`)};
const playlistEssayFilmCardBeforeWatchlist=playlistEssayFilmCard;
playlistEssayFilmCard=function(entry,options={}){
  const card=playlistEssayFilmCardBeforeWatchlist(entry,options),film=entry?.film;
  if(!film?.id)return card;
  return `<div class="playlist-essay-film-row">${card}${watchlistButtonMarkup(film).replace('class="watchlist-toggle','class="watchlist-toggle playlist-essay-watchlist')}</div>`
};
function syncWatchlistButtons(filmId,active){
  const label=active?"Von der Watchlist entfernen":"Zur Watchlist hinzufügen";
  document.querySelectorAll(`[data-watchlist-film-id="${CSS.escape(String(filmId))}"]`).forEach(button=>{button.classList.toggle("is-active",active);button.setAttribute("aria-pressed",String(active));button.setAttribute("aria-label",label);button.title=label})
}
function toggleWatchlistFilm(filmId){
  const id=String(filmId||"").trim();if(!id)return;
  const existing=watchlistEntries.findIndex(entry=>sameId(entry.id,id)),adding=existing<0,previous=watchlistEntries;
  watchlistEntries=adding?[{id,addedAt:new Date().toISOString()},...watchlistEntries]:watchlistEntries.filter((_,index)=>index!==existing);
  if(!persistWatchlist()){watchlistEntries=previous;toast("Watchlist konnte nicht gespeichert werden");return}
  watchlistRevision+=1;automaticArchiveCache.signature="";syncWatchlistButtons(id,adding);if(sameId(activeProjectId,AUTOMATIC_WATCHLIST_ID))renderSelectedProject();else renderAutomaticArchiveProjects();
  toast(adding?"Zur Watchlist hinzugefügt":"Von der Watchlist entfernt")
}

document.addEventListener("change",event=>{
  const checkbox=event.target.closest?.("[data-watchlist-complete]");
  if(checkbox?.checked)toggleWatchlistFilm(checkbox.dataset.watchlistComplete)
});
document.addEventListener("click",event=>{
  const watchlistButton=event.target.closest?.("[data-watchlist-film-id]");
  if(watchlistButton){event.preventDefault();event.stopPropagation();toggleWatchlistFilm(watchlistButton.dataset.watchlistFilmId);return}
  const button=event.target.closest?.("[data-automatic-project-id]");if(button)selectProject(button.dataset.automaticProjectId)
});
renderAutomaticArchiveProjects();syncAutomaticArchiveControls();
