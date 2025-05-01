import {ProductPage} from "../product/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {AddCardButtonComponent} from "../../components/add-card-button/index.js";
import {DeleteCardButtonComponent} from "../../components/delete-card-button/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return [
            { id: 1, src: "https://alfabank.servicecdn.ru/site-upload/4f/19/1449/D_CardPromo_364x364_170924_2.png", title: "Лучшие условия", text: "Кредит до 1 млн рублей!" },
            { id: 2, src: "https://alfabank.servicecdn.ru/site-upload/dc/75/1449/D_CardPromo_364x364_260724.png", title: "Низкие проценты", text: "Кредит до 10 млн. рублей!" },
            { id: 3, src: "https://alfabank.servicecdn.ru/site-upload/f3/f9/1449/D_CardPromo_364x364_280325.png", title: "Банк №1 в России", text: "Кредит до 100 млн. рублей!" }
        ];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <header class="py-3 mb-4 border-bottom">
                    <h1 class="h3">
                        <a href="#" class="text-decoration-none text-dark">Домой</a>
                    </h1>
            </header>

            <div id="main-page" class="container">


                <!-- my Section -->

                <div class="d-flex justify-content-center mb-3">
                    <input type="number" id="filter-input" placeholder="Макс. сумма в млн ₽" class="form-control me-2" style="max-width: 200px;">
                    <button class="btn btn-custom" id="filter-btn">Фильтровать</button>
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

                <!-- Static function cards below -->
                <div class="d-flex justify-content-center static-cards" style="margin-top:6rem; gap:1rem; flex-wrap:nowrap; overflow-x:hidden;">
                    <!-- Card templates populated in render() -->
                </div>
            </div>
        `;
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    clickAdd(e) {
        const myInner = document.getElementById('my-inner');
        const newItem = { id: Date.now(), src: "https://alfabank.servicecdn.ru/site-upload/4f/19/1449/D_CardPromo_364x364_170924_2.png", title: "Лучшие условия", text: "Кредит до 1 млн рублей!" };
        const productCard = new ProductCardComponent(myInner);
        productCard.render(newItem, this.clickCard.bind(this));
    }

    clickDelete(e) {
        const myInner = document.getElementById('my-inner');
        const activeCard = myInner.querySelector('.active');
        if (activeCard) {
            activeCard.remove();
            if (myInner.children.length > 0) myInner.children[0].classList.add('active');
        }
    }

    countIdentic(arr) {
        const counts = {};
        arr.forEach(x => counts[x] = (counts[x] || 0) + 1);
        return Object.values(counts).reduce((sum, c) => sum + (c > 1 ? c - 1 : 0), 0);
    }
    average(arr) {цй    
        return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
    }
    rangeString(arr) {
        const nums = [...new Set(arr)].sort((a, b) => a - b), ranges = [];
        let start = nums[0], end = nums[0];
        for (let i = 1; i <= nums.length; i++) {
            if (nums[i] === end + 1) end = nums[i];
            else { ranges.push(start === end ? `${start}` : `${start}-${end}`); start = nums[i]; end = nums[i]; }
        }
        return ranges.join(',');
    }
    anagram(arr) {
        const map = {};
        arr.forEach(word => {
            const key = word.toLowerCase().split('').sort().join('');
            (map[key] = map[key] || []).push(word);
        });
        return Object.values(map).filter(g => g.length > 1).map(g => g.sort()).sort((a, b) => a[0].localeCompare(b[0]));
    }

    bindStaticListeners() {
        const container = document.querySelector('.static-cards');
        const templates = [
            { id: 1, title: '1. Количество заявок на одинаковые суммы кредита (в млн. рублей)', placeholder: 'Например: 1,2,2,3,3,3', handler: () => this.countIdentic },
            { id: 2, title: '2. Средняя сумма запрашиваемых кредитов (в млн. рублей)', placeholder: 'Например: 1,2,3,4', handler: () => this.average },
            { id: 3, title: '3. Группировка кредитных запросов по диапазонам', placeholder: 'Например: 1,2,3,5,6,7', handler: () => this.rangeString },
            { id: 4, title: '4. Проверка похожих имён клиентов, оформивших кредит', placeholder: 'Например: Иван,Ваня,Нива,Найв', handler: () => this.anagram }
        ];
        templates.forEach(t => {
            const cardWrapper = document.createElement('div');
            cardWrapper.style.minWidth = '300px';
            cardWrapper.innerHTML = `
                <div class="card card-custom">
                    <div class="card-body">
                        <h5 class="card-title">${t.title}</h5>
                        <input type="text" id="input-${t.id}" class="form-control mb-2" placeholder="${t.placeholder}" />
                        <button id="calc-${t.id}" class="btn btn-custom mb-2">Вычислить</button>
                        <div id="output-${t.id}" class="text-dark font-weight-bold"></div>
                    </div>
                </div>
            `;
            container.append(cardWrapper);
            document.getElementById(`calc-${t.id}`).addEventListener('click', () => {
                const raw = document.getElementById(`input-${t.id}`).value;
                const arr = t.id === 4 ? raw.split(',').map(s => s.trim()) : raw.split(',').map(Number);
                const result = t.handler().call(this, arr);
                document.getElementById(`output-${t.id}`).innerText = t.id === 4 ? JSON.stringify(result) : result;
            });
        });
    }

    renderCards(items) {
        const myInner = document.getElementById('my-inner');
        myInner.innerHTML = ''; 
        items.forEach(item => {
          new ProductCardComponent(myInner).render(item, this.clickCard.bind(this));
        });
        if (myInner.firstElementChild) {
          myInner.firstElementChild.classList.add('active');
        }
      }
    

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const myInner = document.getElementById('my-inner');
        this.getData().forEach(item => {
            new ProductCardComponent(myInner).render(item, this.clickCard.bind(this));
        });
        new AddCardButtonComponent(document.getElementById('add-button-container')).render(this.clickAdd.bind(this));
        new DeleteCardButtonComponent(document.getElementById('delete-button-container')).render(this.clickDelete.bind(this));

        this.bindStaticListeners();

        document.getElementById('filter-btn').addEventListener('click', () => {
            const max = Number(document.getElementById('filter-input').value);
            const filtered = this.getData().filter(item => {
              const match = item.text.match(/до\s*([\d\s]+)\s*млн/);
              if (!match) return false;
              const amount = Number(match[1].replace(/\s/g, ''));
              return amount <= max;
            });
            this.renderCards(filtered);
          });
  
    }
}
