export class DeleteCardButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return `
    <div class="templates-card">
        <div class="card-body-custom">
            <button id="delete-card-button" class="delete-card-button" type="button">Удалить карточку</button>
        </div>
    </div>`
    }

    addListeners(listener) {
		document.getElementById('delete-card-button').addEventListener('click', listener)
	}

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}