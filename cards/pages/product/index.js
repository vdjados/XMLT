import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {ProductComponent} from "../../components/product/index.js";
import { ajax } from "../../modules/ajax.js";
import {creditUrls} from "../../modules/creditUrls.js";
export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    calcuateCredit(id){
        if (id > 3){
            return 1
        } else{
            return Math.pow(10,this.id-1)
        }
        
    }

    async getData() {
        try {
            const {data} = await ajax.get(creditUrls.getCreditById(this.id));
            this.renderData(data);
        } catch (error) {
            console.error('Ошибка загрузки данных продукта:', error);
        }
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <header class="py-3 mb-4 border-bottom">
                    <h1 class="h3">
                        <a href="#" class="text-decoration-none text-dark" id="home-link">Домой</a>
                    </h1>
                </header>
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot)
        product.render(item)
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        this.getData()

        const backButton = new BackButtonComponent(this.parent)
        backButton.render(this.clickBack.bind(this))

        document.getElementById('home-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.clickBack();
        });
    }
}