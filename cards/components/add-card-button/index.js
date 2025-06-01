export class AddCardButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return `
            <div class="my-item">
                <div class="card card-custom add-card-custom">
                    <img src="https://alfabank.servicecdn.ru/site-upload/4f/19/1449/D_CardPromo_364x364_170924_2.png" class="card-img" alt="Добавить карточку">
                    <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
                        <div class="add-card-icon">+</div>
                        <h5 class="card-title text-center">Добавить карточку</h5>
                    </div>
                </div>
            </div>
        `
    }

    addListeners(listener) {
        const addCardButton = this.parent.querySelector('.add-card-custom')
        if (addCardButton) {
            addCardButton.addEventListener('click', listener)
        }
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}
/*

export class AddCardButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return `
    <div class="templates-card">
        <div class="card-body-custom">
            <button id="add-card-button" class="add-card-button" type="button">Добавить карточку</button>
        </div>
    </div>`
    }

    addListeners(listener) {
		document.getElementById('add-card-button').addEventListener('click', listener)
	}

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}*/