(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();class m{constructor(e){this.parent=e}addListeners(e){document.getElementById("back-button").addEventListener("click",e)}getHTML(){return`
                <button id="back-button" class="back-button" type="button">Назад</button>
            `}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.addListeners(e)}}class p{constructor(e){this.parent=e}getHTML(e){return`
                <div class="card mb-3 position-relative" style="width: 300px;">
                <img src="${e.src}" class="card-img" alt="картинка" style="height: 100%; object-fit: cover;">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${e.creditTitle}</h5>
                        <p class="card-text">${e.creditText}</p>
                    </div>
                </div>
            `}render(e){const t=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",t)}}class g{async get(e){try{const t=await fetch(e,{method:"GET"});return this._handleResponse(t)}catch(t){throw console.error("GET request failed:",t),t}}async post(e,t){try{const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return this._handleResponse(r)}catch(r){throw console.error("POST request failed:",r),r}}async patch(e,t){try{const r=await fetch(e,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return this._handleResponse(r)}catch(r){throw console.error("PATCH request failed:",r),r}}async delete(e){try{const t=await fetch(e,{method:"DELETE"});return this._handleResponse(t)}catch(t){throw console.error("DELETE request failed:",t),t}}async _handleResponse(e){const t=await e.text();let r=null;if(t)try{r=JSON.parse(t)}catch(s){console.error("JSON parsing error:",s)}return{data:r,status:e.status}}}const d=new g;class v{constructor(){this.baseUrl="http://localhost:3000"}getCredits(){return`${this.baseUrl}/credits`}getCreditById(e){return`${this.baseUrl}/credits/${e}`}createCredit(){return`${this.baseUrl}/credits`}removeCreditById(e){return`${this.baseUrl}/credits/${e}`}updateCreditById(e){return`${this.baseUrl}/credits/${e}`}}const c=new v;class b{constructor(e,t){this.parent=e,this.id=t}calcuateCredit(e){return e>3?1:Math.pow(10,this.id-1)}async getData(){try{const{data:e}=await d.get(c.getCreditById(this.id));this.renderData(e)}catch(e){console.error("Ошибка загрузки данных продукта:",e)}}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
                <header class="py-3 mb-4 border-bottom">
                    <h1 class="h3">
                        <a href="#" class="text-decoration-none text-dark" id="home-link">Домой</a>
                    </h1>
                </header>
                <div id="product-page"></div>
            `}clickBack(){new l(this.parent).render()}renderData(e){new p(this.pageRoot).render(e)}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.getData(),new m(this.parent).render(this.clickBack.bind(this)),document.getElementById("home-link").addEventListener("click",r=>{r.preventDefault(),this.clickBack()})}}class u{constructor(e){this.parent=e}getHTML(e){let t=`
            <div class="card card-custom">
            
                <img class="card-img-top" src="${e.src}" alt="картинка">
                <div class="card-img-overlay" >
                    <h5 class="card-title">${e.creditTitle}</h5>
                    <p class="card-text">${e.creditText}</p>
                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-custom" id="click-card-${e.id}" data-id="${e.id}">Подробнее</button>
                        <button class="btn btn-custom" id="edit-card-${e.id}" data-id="${e.id}">Редактировать</button>
                        <button class="btn btn-custom" id="delete-card-${e.id}" data-id="${e.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `;return e.id==1?t=`<div class="my-item active">${t}</div>`:t=`<div class="my-item">${t}</div>`,t}addListeners(e,t,r,s){document.getElementById(`click-card-${e.id}`).addEventListener("click",t),document.getElementById(`delete-card-${e.id}`).addEventListener("click",()=>r(e.id)),document.getElementById(`edit-card-${e.id}`).addEventListener("click",()=>s(e.id))}render(e,t,r,s){const i=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",i),this.addListeners(e,t,r,s)}}class y{constructor(e){this.parent=e}getHTML(){return`
            <div class="templates-card">
                <div class="card-body-custom">
                    <button id="add-card-button" class="add-card-button" type="button">Добавить карточку</button>
                </div>
            </div>
        `}addListeners(e){document.getElementById("add-card-button").addEventListener("click",e)}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.addListeners(e)}}class f{constructor(e){this.parent=e}clickBack(){new l(this.parent).render()}getHTML(){return`

        <header class="py-3 mb-4 border-bottom">
            <h1 class="h3">
                <a href="#" class="text-decoration-none text-dark" id="home-link">Домой</a>
            </h1>
        </header>
        
        <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div class="card-custom p-4 shadow" style="max-width: 600px; width: 100%;">
                <h2 class="mb-3 text-center" style="color: #030306;">Добавление новой карточки</h2>
                <p class="text-center" style="color: #030306e0;">Заполните форму, чтобы добавить карточку в список кредитов.</p>

                <form id="add-card-form">
                    <div class="mb-3">
                        <label for="title" class="form-label" style="color: #030306;">Заголовок</label>
                        <input type="text" class="form-control" id="title" placeholder="Например: Быстрые деньги" required>
                        <div class="form-text">Название карточки, например, «Кредит наличными»</div>
                    </div>

                    <div class="mb-3">
                        <label for="text" class="form-label" style="color: #030306;">Описание</label>
                        <textarea class="form-control" id="text" rows="3" placeholder="Например: до 1 млн ₽ под 5% годовых" required></textarea>
                        <div class="form-text">Краткое описание условий кредитования</div>
                    </div>

                    <div class="mb-3">
                        <label for="src" class="form-label" style="color: #030306;">Ссылка на изображение</label>
                        <input type="url" class="form-control" id="src" placeholder="https://example.com/logo.jpg" required>
                        <div class="form-text">Прямая ссылка на изображение или логотип банка</div>
                    </div>

                    <button type="submit" class="btn-custom">Добавить карточку</button>
                    <div class="d-flex justify-content-center mt-3" id="back-button-container"></div>
                </form>

                <div id="response-message" class="mt-4"></div>
            </div>
        </div>
    `}render(){this.parent.innerHTML=this.getHTML(),document.getElementById("add-card-form").addEventListener("submit",t=>{t.preventDefault();const r={creditTitle:document.getElementById("title").value,creditText:document.getElementById("text").value,src:document.getElementById("src").value};d.post(c.createCredit(),r,(s,i)=>{const n=document.getElementById("response-message");i===201||i===200?(n.innerHTML='<div class="alert alert-success">Карточка добавлена успешно!</div>',document.getElementById("add-card-form").reset()):n.innerHTML=`<div class="alert alert-danger">Ошибка при добавлении карточки (код ${i})</div>`})}),document.getElementById("home-link").addEventListener("click",t=>{t.preventDefault(),this.clickBack()}),new m(document.getElementById("back-button-container")).render(this.clickBack.bind(this))}}class E{constructor(e,t){this.parent=e,this.cardData=t}clickBack(){new l(this.parent).render()}getHTML(){return`

        <header class="py-3 mb-4 border-bottom">
            <h1 class="h3">
                <a href="#" class="text-decoration-none text-dark" id="home-link">Домой</a>
            </h1>
        </header>
        
        <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div class="card-custom p-4 shadow" style="max-width: 600px; width: 100%;">
                <h2 class="mb-3 text-center" style="color: #030306;">Редактирование карточки</h2>
                <p class="text-center" style="color: #030306e0;">Заполните форму, чтобы добавить карточку в список кредитов.</p>

                <form id="edit-card-form">
                    <div class="mb-3">
                        <label for="title" class="form-label" style="color: #030306;">Заголовок</label>
                        <input type="text" class="form-control" id="title" placeholder="Например: Быстрые деньги" required>
                        <div class="form-text">Название карточки, например, «Кредит наличными»</div>
                    </div>

                    <div class="mb-3">
                        <label for="text" class="form-label" style="color: #030306;">Описание</label>
                        <textarea class="form-control" id="text" rows="3" placeholder="Например: до 1 млн ₽ под 5% годовых" required></textarea>
                        <div class="form-text">Краткое описание условий кредитования</div>
                    </div>

                    <div class="mb-3">
                        <label for="src" class="form-label" style="color: #030306;">Ссылка на изображение</label>
                        <input type="url" class="form-control" id="src" placeholder="https://example.com/logo.jpg" required>
                        <div class="form-text">Прямая ссылка на изображение или логотип банка</div>
                    </div>

                    <button type="submit" class="btn-custom">Обновить карточку</button>
                    <div class="d-flex justify-content-center mt-3" id="back-button-container"></div>
                </form>

                <div id="response-message" class="mt-4"></div>
            </div>
        </div>
    `}render(){this.parent.innerHTML=this.getHTML(),document.getElementById("title").value=this.cardData.creditTitle,document.getElementById("text").value=this.cardData.creditText,document.getElementById("src").value=this.cardData.src,document.getElementById("edit-card-form").addEventListener("submit",t=>{t.preventDefault();const r={creditTitle:document.getElementById("title").value,creditText:document.getElementById("text").value,src:document.getElementById("src").value};d.patch(c.updateCreditById(this.cardData.id),r,(s,i)=>{const n=document.getElementById("response-message");i===200?(n.innerHTML='<div class="alert alert-success">Карточка успешно обновлена!</div>',setTimeout(()=>this.clickBack(),1500)):n.innerHTML=`<div class="alert alert-danger">Ошибка при обновлении карточки (код ${i})</div>`})}),document.getElementById("home-link").addEventListener("click",t=>{t.preventDefault(),this.clickBack()}),new m(document.getElementById("back-button-container")).render(this.clickBack.bind(this))}}class l{constructor(e){this.parent=e,this.currentData=[],this.filteredData=[],this.limit=5,this.filterText=""}async getData(){const e=new URLSearchParams;this.filterText&&e.append("creditTitle",this.filterText);try{const{data:t}=await d.get(`${c.getCredits()}?${e}`);this.currentData=t,this.applyPagination(),this.renderCards(this.paginatedData)}catch(t){console.error("Ошибка загрузки данных:",t)}}applyPagination(){this.paginatedData=this.currentData.slice(0,this.limit)}get pageRoot(){return document.getElementById("main-page")}setupControls(){let e;document.getElementById("title-filter").addEventListener("input",t=>{clearTimeout(e),e=setTimeout(()=>{this.filterText=t.target.value.trim(),this.getData()},500)}),document.getElementById("pagination-limit").addEventListener("change",t=>{this.limit=Math.max(1,parseInt(t.target.value)||5),this.applyPagination(),this.renderCards(this.paginatedData)})}getHTML(){return`
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
                        </div>
                    </div>
                </div>

            </div>
        `}clickCard(e){const t=e.target.dataset.id;new b(this.parent,t).render()}clickAdd(e){new f(this.parent).render()}clickDelete(e){const t=document.getElementById("my-inner"),r=t.querySelector(".active");r&&(r.remove(),t.children.length>0&&t.children[0].classList.add("active"))}countIdentic(e){const t={};return e.forEach(r=>t[r]=(t[r]||0)+1),Object.values(t).reduce((r,s)=>r+(s>1?s-1:0),0)}average(e){return цй,e.length?e.reduce((t,r)=>t+r,0)/e.length:0}rangeString(e){const t=[...new Set(e)].sort((n,o)=>n-o),r=[];let s=t[0],i=t[0];for(let n=1;n<=t.length;n++)t[n]===i+1||(r.push(s===i?`${s}`:`${s}-${i}`),s=t[n]),i=t[n];return r.join(",")}anagram(e){const t={};return e.forEach(r=>{const s=r.toLowerCase().split("").sort().join("");(t[s]=t[s]||[]).push(r)}),Object.values(t).filter(r=>r.length>1).map(r=>r.sort()).sort((r,s)=>r[0].localeCompare(s[0]))}bindStaticListeners(){const e=document.querySelector(".static-cards");[{id:1,title:"1. Количество заявок на одинаковые суммы кредита (в млн. рублей)",placeholder:"Например: 1,2,2,3,3,3",handler:()=>this.countIdentic},{id:2,title:"2. Средняя сумма запрашиваемых кредитов (в млн. рублей)",placeholder:"Например: 1,2,3,4",handler:()=>this.average},{id:3,title:"3. Группировка кредитных запросов по диапазонам",placeholder:"Например: 1,2,3,5,6,7",handler:()=>this.rangeString},{id:4,title:"4. Проверка похожих имён клиентов, оформивших кредит",placeholder:"Например: Иван,Ваня,Нива,Найв",handler:()=>this.anagram}].forEach(r=>{const s=document.createElement("div");s.style.minWidth="300px",s.innerHTML=`
                <div class="card card-custom">
                    <div class="card-body">
                        <h5 class="card-title">${r.title}</h5>
                        <input type="text" id="input-${r.id}" class="form-control mb-2" placeholder="${r.placeholder}" />
                        <button id="calc-${r.id}" class="btn btn-custom mb-2">Вычислить</button>
                        <div id="output-${r.id}" class="text-dark font-weight-bold"></div>
                    </div>
                </div>
            `,e.append(s),document.getElementById(`calc-${r.id}`).addEventListener("click",()=>{const i=document.getElementById(`input-${r.id}`).value,n=r.id===4?i.split(",").map(h=>h.trim()):i.split(",").map(Number),o=r.handler().call(this,n);document.getElementById(`output-${r.id}`).innerText=r.id===4?JSON.stringify(o):o})})}clickEdit(e){const t=this.currentData.find(s=>s.id===e);if(!t)return;new E(this.parent,t).render()}deleteCard(e){d.delete(`${c.getCredits()}/${e}`,t=>{this.currentData=this.currentData.filter(r=>r.id!==e),this.applyPagination(),this.renderCards(this.paginatedData)},t=>{console.error("Ошибка при удалении:",t),alert("Не удалось удалить карточку")})}renderData(e){const t=document.getElementById("my-inner");t.innerHTML="",e.forEach(r=>{new u(t).render(r,this.clickCard.bind(this))})}renderCards(e){const t=document.getElementById("my-inner");t.innerHTML="",e.forEach(r=>{new u(t).render(r,this.clickCard.bind(this),this.deleteCard.bind(this),this.clickEdit.bind(this))}),t.firstElementChild&&t.firstElementChild.classList.add("active")}render(){this.parent.innerHTML=this.getHTML(),new y(document.getElementById("add-button-container")).render(this.clickAdd.bind(this)),this.setupControls(),this.getData()}}const x=document.getElementById("root"),B=new l(x);B.render();
