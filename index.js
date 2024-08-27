import{a as g,S as y,i as d}from"./assets/vendor-DOgVoBmD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=i(e);fetch(e.href,a)}})();const L="https://pixabay.com/api/",b="33291155-7539ac0bf1c0d1be65bb6c22f";async function u({searchQuery:r,currentPage:t,perPage:i}){const n=new URLSearchParams({key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:i}),{data:e}=await g(`${L}?${n}`);return e}function P(r){return r.map(({webformatURL:t,largeImageURL:i,tags:n,likes:e,views:a,comments:l,downloads:h})=>`<div class="photo-card">
     <a class="photo-card__link" href="${i}"> <img src="${t}" alt="${n}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${e}
        </p>
        <p class="info-item">
          <b>Views</b>${a}
        </p>
        <p class="info-item">
          <b>Comments</b>${l}
        </p>
        <p class="info-item">
          <b>Downloads</b>${h}
        </p>
      </div>
    </div>`).join("")}function m(r,t){t.insertAdjacentHTML("beforeend",P(r))}const o={searchForm:document.getElementById("search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader-container"),loadMoreBtn:document.querySelector(".load-more")},c="hidden",p=new y(".photo-card a",{captionsData:"alt",captionDelay:250}),s={currentPage:1,searchQuery:"",maxPage:1,perPage:15};o.searchForm.addEventListener("submit",v);async function v(r){r.preventDefault();const t=r.currentTarget;if(s.searchQuery=t.elements.searchQuery.value.trim(),!s.searchQuery){d.error({position:"topRight",message:"Empty query!"});return}o.loader.classList.remove(c),s.currentPage=1;try{const{hits:i,totalHits:n}=await u(s);if(n===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");s.maxPage=Math.ceil(n/s.perPage),o.gallery.innerHTML="",m(i,o.gallery),p.refresh(),n>s.perPage&&(o.loadMoreBtn.classList.remove(c),o.loadMoreBtn.addEventListener("click",f))}catch(i){d.error({position:"topRight",message:i.message})}finally{t.reset(),o.loader.classList.add(c)}}async function f(){s.currentPage+=1,o.loader.classList.remove(c),o.loadMoreBtn.classList.add(c);try{const{hits:r}=await u(s);m(r,o.gallery),p.refresh(),w()}catch(r){d.error({position:"topRight",message:r.message})}finally{o.loader.classList.add(c),s.currentPage+1<=s.maxPage?o.loadMoreBtn.classList.remove(c):(o.loadMoreBtn.classList.add(c),d.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."}),o.loadMoreBtn.removeEventListener("click",f))}}function w(){const r=document.querySelector(".photo-card");if(!r)return;const t=r.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
