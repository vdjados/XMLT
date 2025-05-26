(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();class m{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
                <button id="back-button" class="back-button" type="button">Назад</button>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class p{async get(t){try{const e=await fetch(t,{method:"GET"});return this._handleResponse(e)}catch(e){throw console.error("GET request failed:",e),e}}async post(t,e){try{const r=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return this._handleResponse(r)}catch(r){throw console.error("POST request failed:",r),r}}async patch(t,e){try{const r=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return this._handleResponse(r)}catch(r){throw console.error("PATCH request failed:",r),r}}async delete(t){try{const e=await fetch(t,{method:"DELETE"});return this._handleResponse(e)}catch(e){throw console.error("DELETE request failed:",e),e}}put(t,e,r){const s=new XMLHttpRequest;s.open("PUT",t),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(e)),s.onreadystatechange=()=>{s.readyState===4&&this._handleResponse(s,r)}}async _handleResponse(t){const e=await t.text();let r=null;if(e)try{r=JSON.parse(e)}catch(s){console.error("JSON parsing error:",s)}return{data:r,status:t.status}}}const d=new p;class g{constructor(){this.baseUrl="http://localhost:3000"}getCredits(){return`${this.baseUrl}/credits`}getCreditById(t){return`${this.baseUrl}/credits/${t}`}createCredit(){return`${this.baseUrl}/credits`}removeCreditById(t){return`${this.baseUrl}/credits/${t}`}updateCreditById(t){return`${this.baseUrl}/credits/${t}`}}const c=new g;class v{constructor(t){this.parent=t,this.data=null}getHTML(t){if(!t)return"";const e=(t.comments||[]).map(r=>`
            <div class="comment mb-3 p-3 border rounded bg-white">
                <p class="mb-1 text-dark">${r.text}</p>
                <small class="text-muted">${new Date(r.date).toLocaleString()}</small>
            </div>
        `).join("");return`
            <div class="product-container">
                <div class="card mb-3 position-relative" style="width: 300px;">
                    <img src="${t.src}" class="card-img" alt="картинка" style="height: 100%; object-fit: cover;">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${t.creditTitle}</h5>
                        <p class="card-text">${t.creditText}</p>
                    </div>
                </div>
                <div class="comments-section mt-4">
                    <h4>Комментарии</h4>
                    <div class="comments-list mb-3">
                        ${e}
                    </div>
                    <div class="add-comment">
                        <textarea class="form-control mb-2" id="comment-text" rows="3" placeholder="Напишите комментарий..."></textarea>
                        <button style="background-color: #ef3124; color: #fff; border-radius: 8px; border: 0; padding: 8px 12px; font-size: 14px;" id="submit-comment">Отправить</button>
                    </div>
                </div>
            </div>
        `}addComment(t){if(!this.data)return;const e={id:Date.now(),text:t,date:new Date().toISOString()},r={...this.data,comments:[...this.data.comments||[],e]};d.patch(c.updateCreditById(this.data.id),r,s=>{s&&(this.data=s,this.updateView())})}updateView(){const t=this.parent.querySelector(".product-container");t&&t.remove();const e=this.getHTML(this.data);this.parent.insertAdjacentHTML("beforeend",e),this.setupEventListeners()}setupEventListeners(){const t=this.parent.querySelector("#submit-comment"),e=this.parent.querySelector("#comment-text");t&&e&&t.addEventListener("click",()=>{const r=e.value.trim();r&&(this.addComment(r),e.value="")})}render(t){t&&(this.data=t,this.updateView())}}class b{constructor(t,e){this.parent=t,this.id=e}calcuateCredit(t){return t>3?1:Math.pow(10,this.id-1)}async getData(){try{const{data:t}=await d.get(c.getCreditById(this.id));this.renderData(t)}catch(t){console.error("Ошибка загрузки данных продукта:",t)}}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
                <header class="py-3 mb-4 border-bottom">
                    <h1 class="h3">
                        <a href="#" class="text-decoration-none text-dark" id="home-link">Домой</a>
                    </h1>
                </header>
                <div id="product-page"></div>
            `}clickBack(){new l(this.parent).render()}renderData(t){new v(this.pageRoot).render(t)}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.getData(),new m(this.parent).render(this.clickBack.bind(this)),document.getElementById("home-link").addEventListener("click",r=>{r.preventDefault(),this.clickBack()})}}class u{constructor(t){this.parent=t}getHTML(t){let e=`
            <div class="card card-custom">
            
                <img class="card-img-top" src="${t.src}" alt="картинка">
                <div class="card-img-overlay" >
                    <h5 class="card-title">${t.creditTitle}</h5>
                    <p class="card-text">${t.creditText}</p>
                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-custom" id="click-card-${t.id}" data-id="${t.id}">Подробнее</button>
                        <button class="btn btn-custom" id="edit-card-${t.id}" data-id="${t.id}">Редактировать</button>
                        <button class="btn btn-custom" id="delete-card-${t.id}" data-id="${t.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `;return t.id==1?e=`<div class="my-item active">${e}</div>`:e=`<div class="my-item">${e}</div>`,e}addListeners(t,e,r,s){document.getElementById(`click-card-${t.id}`).addEventListener("click",e),document.getElementById(`delete-card-${t.id}`).addEventListener("click",()=>r(t.id)),document.getElementById(`edit-card-${t.id}`).addEventListener("click",()=>s(t.id))}render(t,e,r,s){const i=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",i),this.addListeners(t,e,r,s)}}class f{constructor(t){this.parent=t}getHTML(){return`
            <div class="templates-card">
                <div class="card-body-custom">
                    <button id="add-card-button" class="add-card-button" type="button">Добавить карточку</button>
                </div>
            </div>
        `}addListeners(t){document.getElementById("add-card-button").addEventListener("click",t)}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class y{constructor(t){this.parent=t}clickBack(){new l(this.parent).render()}getHTML(){return`

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
    `}render(){this.parent.innerHTML=this.getHTML(),document.getElementById("add-card-form").addEventListener("submit",e=>{e.preventDefault();const r={creditTitle:document.getElementById("title").value,creditText:document.getElementById("text").value,src:document.getElementById("src").value};d.post(c.createCredit(),r,(s,i)=>{const n=document.getElementById("response-message");i===201||i===200?(n.innerHTML='<div class="alert alert-success">Карточка добавлена успешно!</div>',document.getElementById("add-card-form").reset()):n.innerHTML=`<div class="alert alert-danger">Ошибка при добавлении карточки (код ${i})</div>`})}),document.getElementById("home-link").addEventListener("click",e=>{e.preventDefault(),this.clickBack()}),new m(document.getElementById("back-button-container")).render(this.clickBack.bind(this))}}class x{constructor(t,e){this.parent=t,this.cardData=e}clickBack(){new l(this.parent).render()}getHTML(){return`

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
    `}render(){this.parent.innerHTML=this.getHTML(),document.getElementById("title").value=this.cardData.creditTitle,document.getElementById("text").value=this.cardData.creditText,document.getElementById("src").value=this.cardData.src,document.getElementById("edit-card-form").addEventListener("submit",e=>{e.preventDefault();const r={creditTitle:document.getElementById("title").value,creditText:document.getElementById("text").value,src:document.getElementById("src").value};d.patch(c.updateCreditById(this.cardData.id),r,(s,i)=>{const n=document.getElementById("response-message");i===200?(n.innerHTML='<div class="alert alert-success">Карточка успешно обновлена!</div>',setTimeout(()=>this.clickBack(),1500)):n.innerHTML=`<div class="alert alert-danger">Ошибка при обновлении карточки (код ${i})</div>`})}),document.getElementById("home-link").addEventListener("click",e=>{e.preventDefault(),this.clickBack()}),new m(document.getElementById("back-button-container")).render(this.clickBack.bind(this))}}class l{constructor(t){this.parent=t,this.currentData=[],this.filteredData=[],this.limit=5,this.filterText=""}async getData(){const t=new URLSearchParams;this.filterText&&t.append("creditTitle",this.filterText);try{const{data:e}=await d.get(`${c.getCredits()}?${t}`);this.currentData=e,this.applyPagination(),this.renderCards(this.paginatedData)}catch(e){console.error("Ошибка загрузки данных:",e)}}applyPagination(){this.paginatedData=this.currentData.slice(0,this.limit)}get pageRoot(){return document.getElementById("main-page")}setupControls(){let t;document.getElementById("title-filter").addEventListener("input",e=>{clearTimeout(t),t=setTimeout(()=>{this.filterText=e.target.value.trim(),this.getData()},500)}),document.getElementById("pagination-limit").addEventListener("change",e=>{this.limit=Math.max(1,parseInt(e.target.value)||5),this.applyPagination(),this.renderCards(this.paginatedData)})}getHTML(){return`
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
        `}clickCard(t){const e=t.target.dataset.id;new b(this.parent,e).render()}clickAdd(t){new y(this.parent).render()}clickDelete(t){const e=document.getElementById("my-inner"),r=e.querySelector(".active");r&&(r.remove(),e.children.length>0&&e.children[0].classList.add("active"))}countIdentic(t){const e={};return t.forEach(r=>e[r]=(e[r]||0)+1),Object.values(e).reduce((r,s)=>r+(s>1?s-1:0),0)}average(t){return цй,t.length?t.reduce((e,r)=>e+r,0)/t.length:0}rangeString(t){const e=[...new Set(t)].sort((n,o)=>n-o),r=[];let s=e[0],i=e[0];for(let n=1;n<=e.length;n++)e[n]===i+1||(r.push(s===i?`${s}`:`${s}-${i}`),s=e[n]),i=e[n];return r.join(",")}anagram(t){const e={};return t.forEach(r=>{const s=r.toLowerCase().split("").sort().join("");(e[s]=e[s]||[]).push(r)}),Object.values(e).filter(r=>r.length>1).map(r=>r.sort()).sort((r,s)=>r[0].localeCompare(s[0]))}bindStaticListeners(){const t=document.querySelector(".static-cards");[{id:1,title:"1. Количество заявок на одинаковые суммы кредита (в млн. рублей)",placeholder:"Например: 1,2,2,3,3,3",handler:()=>this.countIdentic},{id:2,title:"2. Средняя сумма запрашиваемых кредитов (в млн. рублей)",placeholder:"Например: 1,2,3,4",handler:()=>this.average},{id:3,title:"3. Группировка кредитных запросов по диапазонам",placeholder:"Например: 1,2,3,5,6,7",handler:()=>this.rangeString},{id:4,title:"4. Проверка похожих имён клиентов, оформивших кредит",placeholder:"Например: Иван,Ваня,Нива,Найв",handler:()=>this.anagram}].forEach(r=>{const s=document.createElement("div");s.style.minWidth="300px",s.innerHTML=`
                <div class="card card-custom">
                    <div class="card-body">
                        <h5 class="card-title">${r.title}</h5>
                        <input type="text" id="input-${r.id}" class="form-control mb-2" placeholder="${r.placeholder}" />
                        <button id="calc-${r.id}" class="btn btn-custom mb-2">Вычислить</button>
                        <div id="output-${r.id}" class="text-dark font-weight-bold"></div>
                    </div>
                </div>
            `,t.append(s),document.getElementById(`calc-${r.id}`).addEventListener("click",()=>{const i=document.getElementById(`input-${r.id}`).value,n=r.id===4?i.split(",").map(h=>h.trim()):i.split(",").map(Number),o=r.handler().call(this,n);document.getElementById(`output-${r.id}`).innerText=r.id===4?JSON.stringify(o):o})})}clickEdit(t){const e=this.currentData.find(s=>s.id===t);if(!e)return;new x(this.parent,e).render()}deleteCard(t){d.delete(`${c.getCredits()}/${t}`,e=>{this.currentData=this.currentData.filter(r=>r.id!==t),this.applyPagination(),this.renderCards(this.paginatedData)},e=>{console.error("Ошибка при удалении:",e),alert("Не удалось удалить карточку")})}renderData(t){const e=document.getElementById("my-inner");e.innerHTML="",t.forEach(r=>{new u(e).render(r,this.clickCard.bind(this))})}renderCards(t){const e=document.getElementById("my-inner");e.innerHTML="",t.forEach(r=>{new u(e).render(r,this.clickCard.bind(this),this.deleteCard.bind(this),this.clickEdit.bind(this))}),e.firstElementChild&&e.firstElementChild.classList.add("active")}render(){this.parent.innerHTML=this.getHTML(),new f(document.getElementById("add-button-container")).render(this.clickAdd.bind(this)),this.setupControls(),this.getData()}}const E=document.getElementById("root"),L=new l(E);L.render();
