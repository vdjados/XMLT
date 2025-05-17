export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        let result_html = `
            <div class="card card-custom">
            
                <img class="card-img-top" src="${data.src}" alt="картинка">
                <div class="card-img-overlay" >
                    <h5 class="card-title">${data.creditTitle}</h5>
                    <p class="card-text">${data.creditText}</p>
                    <button class="btn btn-custom" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                </div>
            </div>
        `
        
        if (data.id == 1) {
            result_html = `<div class="my-item active">${result_html}</div>`
        } else {
            result_html = `<div class="my-item">${result_html}</div>`
        }
        
        return result_html
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }
    
    render(data,listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}