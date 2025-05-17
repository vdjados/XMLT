(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();class p{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
                <button id="back-button" class="back-button" type="button">Назад</button>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class m{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card mb-3 position-relative" style="width: 300px;">
                <img src="${t.src}" class="card-img" alt="картинка" style="height: 100%; object-fit: cover;">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${t.creditTitle}</h5>
                        <p class="card-text">${t.creditText}</p>
                    </div>
                </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class g{async get(t){try{const e=await fetch(t,{method:"GET"});return this._handleResponse(e)}catch(e){throw console.error("GET request failed:",e),e}}async post(t,e){try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return this._handleResponse(r)}catch(r){throw console.error("POST request failed:",r),r}}async patch(t,e){try{const r=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return this._handleResponse(r)}catch(r){throw console.error("PATCH request failed:",r),r}}async delete(t){try{const e=await fetch(t,{method:"DELETE"});return this._handleResponse(e)}catch(e){throw console.error("DELETE request failed:",e),e}}async _handleResponse(t){const e=await t.text();let r=null;if(e)try{r=JSON.parse(e)}catch(i){console.error("JSON parsing error:",i)}return{data:r,status:t.status}}}const o=new g;class y{constructor(){this.baseUrl="http://localhost:3000"}getCredits(){return`${this.baseUrl}/credits`}getCreditById(t){return`${this.baseUrl}/credits/${t}`}createCredit(){return`${this.baseUrl}/credits`}removeCreditById(){return`${this.baseUrl}/credits/${id}`}updateCreditById(){return`${this.baseUrl}/credits/${id}`}}const l=new y;class f{constructor(t,e){this.parent=t,this.id=e}calcuateCredit(t){return t>3?1:Math.pow(10,this.id-1)}async getData(){try{const{data:t}=await o.get(l.getCreditById(this.id));this.renderData(t)}catch(t){console.error("Ошибка загрузки данных продукта:",t)}}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
                <header class="py-3 mb-4 border-bottom">
                    <h1 class="h3">
                        <a href="#" class="text-decoration-none text-dark" id="home-link">Домой</a>
                    </h1>
                </header>
                <div id="product-page"></div>
            `}clickBack(){new h(this.parent).render()}renderData(t){new m(this.pageRoot).render(t)}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new p(this.pageRoot).render(this.clickBack.bind(this)),this.getData()}}class d{constructor(t){this.parent=t}getHTML(t){let e=`
            <div class="card card-custom">
            
                <img class="card-img-top" src="${t.src}" alt="картинка">
                <div class="card-img-overlay" >
                    <h5 class="card-title">${t.creditTitle}</h5>
                    <p class="card-text">${t.creditText}</p>
                    <button class="btn btn-custom" id="click-card-${t.id}" data-id="${t.id}">Подробнее</button>
                </div>
            </div>
        `;return t.id==1?e=`<div class="my-item active">${e}</div>`:e=`<div class="my-item">${e}</div>`,e}addListeners(t,e){document.getElementById(`click-card-${t.id}`).addEventListener("click",e)}render(t,e){const r=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",r),this.addListeners(t,e)}}class h{constructor(t){this.parent=t,this.currentData=[],this.filteredData=[],this.limit=5,this.filterText=""}async getData(){const t=new URLSearchParams;this.filterText&&t.append("creditTitle",this.filterText);try{const{data:e}=await o.get(`${l.getCredits()}?${t}`);this.currentData=e,this.applyPagination(),this.renderCards(this.paginatedData)}catch(e){console.error("Ошибка загрузки данных:",e)}}applyPagination(){this.paginatedData=this.currentData.slice(0,this.limit)}get pageRoot(){return document.getElementById("main-page")}setupControls(){let t;document.getElementById("title-filter").addEventListener("input",e=>{clearTimeout(t),t=setTimeout(()=>{this.filterText=e.target.value.trim(),this.getData()},500)}),document.getElementById("pagination-limit").addEventListener("change",e=>{this.limit=Math.max(1,parseInt(e.target.value)||5),this.applyPagination(),this.renderCards(this.paginatedData)})}getHTML(){return`
            <header class="py-3 mb-4 border-bottom">
                    <h1 class="h3">
                        <a href="#" class="text-decoration-none text-dark">Домой</a>
                    </h1>
            </header>

            <div id="main-page" class="container">

                <div class="filter-controls mb-4">
                <div class="row g-3">
                    <div class="col-md-6">
                        <input type="text" 
                               id="title-filter" 
                               class="form-control" 
                               placeholder="Фильтрация по названию">
                    </div>
                    <div class="col-md-3">
                        <input type="number" 
                               id="pagination-limit" 
                               class="form-control" 
                               value="5"
                               min="1" 
                               placeholder="Количество карточек">
                    </div>
                </div>
            </div>

                <div class="justify-content-center">
                    <div class="col-auto">
                        <div class="my-container" style="width: ">
                            <div id="my" class="my" data-bs-ride="my">
                                <div class="my-inner" id="my-inner"></div>
                            </div>
                        </div>
                        <!-- Add/Delete Buttons -->
                        <div class="d-flex justify-content-around mt-3">
                            <div id="add-button-container"></div>
                            <div id="delete-button-container"></div>
                        </div>
                    </div>
                </div>

            </div>
        `}clickCard(t){const e=t.target.dataset.id;new f(this.parent,e).render()}clickAdd(t){const e=document.getElementById("my-inner"),r={id:Date.now(),src:"https://alfabank.servicecdn.ru/site-upload/4f/19/1449/D_CardPromo_364x364_170924_2.png",title:"Лучшие условия",text:"Кредит до 1 млн рублей!"};new d(e).render(r,this.clickCard.bind(this))}clickDelete(t){const e=document.getElementById("my-inner"),r=e.querySelector(".active");r&&(r.remove(),e.children.length>0&&e.children[0].classList.add("active"))}countIdentic(t){const e={};return t.forEach(r=>e[r]=(e[r]||0)+1),Object.values(e).reduce((r,i)=>r+(i>1?i-1:0),0)}average(t){return цй,t.length?t.reduce((e,r)=>e+r,0)/t.length:0}rangeString(t){const e=[...new Set(t)].sort((s,c)=>s-c),r=[];let i=e[0],n=e[0];for(let s=1;s<=e.length;s++)e[s]===n+1||(r.push(i===n?`${i}`:`${i}-${n}`),i=e[s]),n=e[s];return r.join(",")}anagram(t){const e={};return t.forEach(r=>{const i=r.toLowerCase().split("").sort().join("");(e[i]=e[i]||[]).push(r)}),Object.values(e).filter(r=>r.length>1).map(r=>r.sort()).sort((r,i)=>r[0].localeCompare(i[0]))}bindStaticListeners(){const t=document.querySelector(".static-cards");[{id:1,title:"1. Количество заявок на одинаковые суммы кредита (в млн. рублей)",placeholder:"Например: 1,2,2,3,3,3",handler:()=>this.countIdentic},{id:2,title:"2. Средняя сумма запрашиваемых кредитов (в млн. рублей)",placeholder:"Например: 1,2,3,4",handler:()=>this.average},{id:3,title:"3. Группировка кредитных запросов по диапазонам",placeholder:"Например: 1,2,3,5,6,7",handler:()=>this.rangeString},{id:4,title:"4. Проверка похожих имён клиентов, оформивших кредит",placeholder:"Например: Иван,Ваня,Нива,Найв",handler:()=>this.anagram}].forEach(r=>{const i=document.createElement("div");i.style.minWidth="300px",i.innerHTML=`
                <div class="card card-custom">
                    <div class="card-body">
                        <h5 class="card-title">${r.title}</h5>
                        <input type="text" id="input-${r.id}" class="form-control mb-2" placeholder="${r.placeholder}" />
                        <button id="calc-${r.id}" class="btn btn-custom mb-2">Вычислить</button>
                        <div id="output-${r.id}" class="text-dark font-weight-bold"></div>
                    </div>
                </div>
            `,t.append(i),document.getElementById(`calc-${r.id}`).addEventListener("click",()=>{const n=document.getElementById(`input-${r.id}`).value,s=r.id===4?n.split(",").map(u=>u.trim()):n.split(",").map(Number),c=r.handler().call(this,s);document.getElementById(`output-${r.id}`).innerText=r.id===4?JSON.stringify(c):c})})}renderData(t){const e=document.getElementById("my-inner");e.innerHTML="",t.forEach(r=>{new d(e).render(r,this.clickCard.bind(this))})}renderCards(t){const e=document.getElementById("my-inner");e.innerHTML="",t.forEach(r=>{new d(e).render(r,this.clickCard.bind(this))}),e.firstElementChild&&e.firstElementChild.classList.add("active")}render(){this.parent.innerHTML=this.getHTML(),this.setupControls(),this.getData()}}const v=document.getElementById("root"),b=new h(v);b.render();
