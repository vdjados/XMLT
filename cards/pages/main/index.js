import {ProductPage} from "../product/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {AddCardButtonComponent} from "../../components/add-card-button/index.js";
import {DeleteCardButtonComponent} from "../../components/delete-card-button/index.js";
import {ajax} from "../../modules/ajax.js";
import {creditUrls} from "../../modules/creditUrls.js";
import { AddCardPage } from "../add/index.js";
import { EditCardPage } from "../edit/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentData = [];    
        this.filteredData = [];  
        this.limit = 5;        
        this.filterText = '';
    }

    getData() {
        
        const params = new URLSearchParams();
            if (this.filterText) {
                params.append('creditTitle', this.filterText);
            }

            ajax.get(`${creditUrls.getCredits()}?${params}`, (data) => {
                this.currentData = data;
                this.applyPagination(); 
                this.renderCards(this.paginatedData);
            });
    }

    applyPagination() {
        this.paginatedData = this.currentData.slice(0, this.limit);
    }


    get pageRoot() {
        return document.getElementById('main-page');
    }

    setupControls() {
    // Фильтр (серверная часть)
    let timeout;
    document.getElementById('title-filter').addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            this.filterText = e.target.value.trim();
            this.getData(); // Новый запрос к серверу при изменении фильтра
        }, 500);
    });

    // Лимит (клиентская часть)
    document.getElementById('pagination-limit').addEventListener('change', (e) => {
        this.limit = Math.max(1, parseInt(e.target.value) || 5);
        this.applyPagination(); // Применяем пагинацию без запроса к серверу
        this.renderCards(this.paginatedData);
    });
}

    getHTML() {
        return `
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
                        <div class="my-container">
                            <div id="my" class="my" data-bs-ride="my">
                                <div class="my-inner" id="my-inner"></div>
                            </div>
                        </div>
                    </div>
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
        const addPage = new AddCardPage(this.parent);
        addPage.render();

        /*const myInner = document.getElementById('my-inner');
        const newItem = { id: Date.now(), src: "https://alfabank.servicecdn.ru/site-upload/4f/19/1449/D_CardPromo_364x364_170924_2.png", title: "Лучшие условия", text: "Кредит до 1 млн рублей!" };
        const productCard = new ProductCardComponent(myInner);
        productCard.render(newItem, this.clickCard.bind(this));*/
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

    clickEdit(id) {
        
        const product = this.currentData.find(item => item.id === id);
        if (!product) return;

        const addPage = new EditCardPage(this.parent, product);
        addPage.render();
    }

    deleteCard(id) {
        ajax.delete(`${creditUrls.getCredits()}/${id}`, (response) => {
            // Успешно удалили на сервере — обновляем список локально и перерисовываем
            this.currentData = this.currentData.filter(item => item.id !== id);
            this.applyPagination();
            this.renderCards(this.paginatedData);
        }, (error) => {
            console.error('Ошибка при удалении:', error);
            alert('Не удалось удалить карточку');
    });
}
    

    renderData(items) {
        const container = document.getElementById('my-inner');
        container.innerHTML = '';
        
        items.forEach((item) => {
            const productCard = new ProductCardComponent(container); 
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    renderCards(items) {
        const myInner = document.getElementById('my-inner');
        myInner.innerHTML = '';

        // Сначала рендерим карточки
        items.forEach((item) => {
            const productCard = new ProductCardComponent(myInner);
            productCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this), this.clickEdit.bind(this));
        });

        // Затем рендерим кнопку добавления
        const addCardButton = new AddCardButtonComponent(myInner);
        addCardButton.render(this.clickAdd.bind(this));
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Удаляем ненужный контейнер для кнопки добавления
        const addButtonContainer = document.getElementById('add-button-container');
        if (addButtonContainer) {
            addButtonContainer.remove();
        }

        this.getData();
        this.setupControls();
    }
}
