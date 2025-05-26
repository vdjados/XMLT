import { ajax } from "../../modules/ajax.js";
import { creditUrls } from "../../modules/creditUrls.js";

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
        this.data = null;
    }

    getHTML(data) {
        if (!data) return '';
        
        const commentsHTML = (data.comments || []).map(comment => `
            <div class="comment mb-3 p-3 border rounded bg-white">
                <p class="mb-1 text-dark">${comment.text}</p>
                <small class="text-muted">${new Date(comment.date).toLocaleString()}</small>
            </div>
        `).join('');

        return `
            <div class="product-container">
                <div class="card mb-3 position-relative" style="width: 300px;">
                    <img src="${data.src}" class="card-img" alt="картинка" style="height: 100%; object-fit: cover;">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${data.creditTitle}</h5>
                        <p class="card-text">${data.creditText}</p>
                    </div>
                </div>
                <div class="comments-section mt-4">
                    <h4>Комментарии</h4>
                    <div class="comments-list mb-3">
                        ${commentsHTML}
                    </div>
                    <div class="add-comment">
                        <textarea class="form-control mb-2" id="comment-text" rows="3" placeholder="Напишите комментарий..."></textarea>
                        <button style="background-color: #ef3124; color: #fff; border-radius: 8px; border: 0; padding: 8px 12px; font-size: 14px;" id="submit-comment">Отправить</button>
                    </div>
                </div>
            </div>
        `;
    }

    addComment(text) {
        if (!this.data) return;

        const newComment = {
            id: Date.now(),
            text: text,
            date: new Date().toISOString()
        };

        const updatedData = {
            ...this.data,
            comments: [...(this.data.comments || []), newComment]
        };

        // Обновляем карточку на сервере
        ajax.patch(creditUrls.updateCreditById(this.data.id), updatedData, (data) => {
            if (data) {
                this.data = data;
                this.updateView();
            }
        });
    }

    updateView() {
        // Очищаем предыдущий контент, если он есть
        const existingContainer = this.parent.querySelector('.product-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        const html = this.getHTML(this.data);
        this.parent.insertAdjacentHTML('beforeend', html);

        // Добавляем обработчики событий
        this.setupEventListeners();
    }

    setupEventListeners() {
        const submitButton = this.parent.querySelector('#submit-comment');
        const textArea = this.parent.querySelector('#comment-text');

        if (submitButton && textArea) {
            submitButton.addEventListener('click', () => {
                const text = textArea.value.trim();
                if (text) {
                    this.addComment(text);
                    textArea.value = '';
                }
            });
        }
    }

    render(data) {
        if (!data) return;
        
        this.data = data;
        this.updateView();
    }
}