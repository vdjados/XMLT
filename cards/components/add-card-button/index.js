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
            </div>
        `
    }

    addListeners(listener) {
        document.getElementById('add-card-button').addEventListener('click', listener)
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