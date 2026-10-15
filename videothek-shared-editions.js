/* Edition playback for film details aggregated across project folders. */
function withActiveDetailFilm(filmId,callback){
  const film=detailFilmForInteraction(filmId),owner=projects.find(project=>(project.films||[]).some(item=>sameId(item.id,filmId)));
  if(!film||!owner)return callback();
  const index=owner.films.findIndex(item=>sameId(item.id,filmId)),original=owner.films[index];
  owner.films[index]=film;
  try{return callback()}finally{owner.films[index]=original}
}

const openInternetArchivePlayerBeforeSharedEditions=openInternetArchivePlayer;
openInternetArchivePlayer=function(filmId,copyIndex){return withActiveDetailFilm(filmId,()=>openInternetArchivePlayerBeforeSharedEditions(filmId,copyIndex))};
const openYouTubePlayerBeforeSharedEditions=openYouTubePlayer;
openYouTubePlayer=function(filmId,copyIndex){return withActiveDetailFilm(filmId,()=>openYouTubePlayerBeforeSharedEditions(filmId,copyIndex))};

document.addEventListener("click",event=>{
  const action=event.target.closest?.(".copy-action[data-copy-film]");
  if(!action)return;
  const film=detailFilmForInteraction(action.dataset.copyFilm),copy=filmCopies(film)[Number(action.dataset.copyIndex)];
  if(!film||!copy)return;
  if(copyIsPhysical(copy)){
    event.preventDefault();event.stopImmediatePropagation();openPhysicalCopyInfo(film,copy,Number(action.dataset.copyIndex));return
  }
  if(copy.access==="password")copyPasswordToClipboard(copy.password);
  if(internetArchiveReference(copy.link)){
    event.preventDefault();event.stopImmediatePropagation();currentPlayerSourceUrl=copy.link;void openInternetArchivePlayer(film.id,action.dataset.copyIndex);return
  }
  if(youtubeVideoId(copy.link)){
    event.preventDefault();event.stopImmediatePropagation();openYouTubePlayer(film.id,action.dataset.copyIndex)
  }
},{capture:true});
