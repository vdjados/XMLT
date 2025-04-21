import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {ProductComponent} from "../../components/product/index.js";
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

    getData() {
        return {
            id: 1,
            src: "https://alfabank.servicecdn.ru/site-upload/c4/9f/1449/D_PureCard_364x364_200125.png",
            title: `Поздравляем!`,
            text: `Теперь Вы можете взять кредит на сумму ${this.calcuateCredit(this.id)} млн. рублей`
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

    

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)


        const data = this.getData()
        const stock = new ProductComponent(this.pageRoot)
        stock.render(data)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        document.getElementById('home-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.clickBack();
        });
    }
}