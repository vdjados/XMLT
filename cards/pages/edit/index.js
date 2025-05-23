import { ajax } from "../../modules/ajax.js";
import { creditUrls } from "../../modules/creditUrls.js";
import { MainPage } from "../main/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";

export class EditCardPage {
    constructor(parent, cardData) {
        this.parent = parent;
        this.cardData = cardData;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    getHTML() {
    return `

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
    `;
    }


    render() {
        this.parent.innerHTML = this.getHTML();

        document.getElementById('title').value = this.cardData.creditTitle;
        document.getElementById('text').value = this.cardData.creditText;
        document.getElementById('src').value = this.cardData.src;

        document.getElementById('edit-card-form').addEventListener('submit', (e) => {
            e.preventDefault();

            const updatedCard = {
                creditTitle: document.getElementById('title').value,
                creditText: document.getElementById('text').value,
                src: document.getElementById('src').value,
            };

            ajax.patch(creditUrls.updateCreditById(this.cardData.id), updatedCard, (data, status) => {
                const msgBox = document.getElementById('response-message');

                if (status === 200) {
                    msgBox.innerHTML = '<div class="alert alert-success">Карточка успешно обновлена!</div>';
                    setTimeout(() => this.clickBack(), 1500);
                } else {
                    msgBox.innerHTML = `<div class="alert alert-danger">Ошибка при обновлении карточки (код ${status})</div>`;
                }
            });
        });

        
        document.getElementById('home-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.clickBack();
        });

        const backButton = new BackButtonComponent(
            document.getElementById('back-button-container')
        );
        backButton.render(this.clickBack.bind(this));


    }

    
}
