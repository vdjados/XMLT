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
            {
                id: 1,
                src: "https://alfabank.servicecdn.ru/site-upload/4f/19/1449/D_CardPromo_364x364_170924_2.png",
                title: "Лучшие условия",
                text: "Кредит до 1 млн рублей!"
            },
            {
                id: 2,
                src: "https://alfabank.servicecdn.ru/site-upload/dc/75/1449/D_CardPromo_364x364_260724.png",
                title: "Низкие проценты",
                text: "Кредит до 10 млн. рублей!"
            },
            {
                id: 3,
                src: "https://alfabank.servicecdn.ru/site-upload/f3/f9/1449/D_CardPromo_364x364_280325.png",
                title: "Банк №1 в России",
                text: "Кредит до 100 млн. рублей!"
            },
        ]
    }
    
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap">
                    <div class="carousel-container" style="width: 350px; margin: 0 auto;">
                        <div id="carousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner" id="carousel-inner">
                            
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Предыдущий</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Следующий</span>
                            </button>
                        </div>
                    </div>
                </div>
            `
        )
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
        
    clickAdd(e) {
        const carouselInner = document.getElementById('carousel-inner')
        const newItem = {
            id: Date.now(),
            src: "https://alfabank.servicecdn.ru/site-upload/4f/19/1449/D_CardPromo_364x364_170924_2.png",
            title: "Лучшие условия",
            text: "Кредит до 1 млн рублей!"
        }
        
        const productCard = new ProductCardComponent(carouselInner)
        productCard.render(newItem, this.clickCard.bind(this))
    }

    clickDelete(e) {
        const carouselInner = document.getElementById('carousel-inner');
        const activeCard = carouselInner.querySelector('.active');
        
        if (activeCard) {
            activeCard.remove();
            
            if (carouselInner.children.length > 0) {
                carouselInner.children[0].classList.add('active');
            }
        }
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const data = this.getData()
        const carouselInner = document.getElementById('carousel-inner')
        data.forEach((item) => {
            
            const productCard = new ProductCardComponent(carouselInner)
            productCard.render(item, this.clickCard.bind(this))

        })
        const addButton = new AddCardButtonComponent(this.pageRoot)
        addButton.render(this.clickAdd.bind(this))

        const deleteButton = new DeleteCardButtonComponent(this.pageRoot)
        deleteButton.render(this.clickDelete.bind(this))
        
    }
}