/* Global work metadata with project-specific holdings. */
const enrichImportedFilmBeforeGlobalWorks=enrichImportedFilm;
enrichImportedFilm=async function(film){
  await enrichImportedFilmBeforeGlobalWorks(film);
  synchronizeWorkMetadata(film);
  importGlobalWorkIndexSignature="";
  return film
};

function globalWorkAudit(){
  const works=new Map(),projectReferences=0,holdingsCount=projects.reduce((total,project)=>total+(project.films||[]).reduce((sum,film)=>sum+filmCopies(film).length,0),0);
  projects.forEach(project=>(project.films||[]).forEach(film=>{
    projectReferences++;
    const key=String(film.id),entry=works.get(key)||{id:key,mediaType:filmMediaType(film),references:0,projects:new Set(),copies:0};
    entry.references++;entry.projects.add(String(project.id));entry.copies+=filmCopies(film).length;works.set(key,entry)
  }));
  return{workCount:works.size,projectReferences,holdingsCount,multiProjectWorks:[...works.values()].filter(entry=>entry.projects.size>1).length}
}

window.NeonVGlobalWorks={audit:globalWorkAudit};
