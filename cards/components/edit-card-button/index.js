export class EditCardButtonComponent {
    constructor(parent) { this.parent = parent; }
    render(onClick) {
        const btn = document.createElement('button');
        btn.innerText = 'Редактировать';
        btn.className = 'btn btn-primary';
        btn.addEventListener('click', onClick);
        this.parent.innerHTML = '';
        this.parent.append(btn);
    }
}
