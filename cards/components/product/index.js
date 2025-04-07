export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3 position-relative" style="width: 300px;">
                <img src="${data.src}" class="card-img" alt="картинка" style="height: 100%; object-fit: cover;">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}