class CreditUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getCredits() {
        return `${this.baseUrl}/credits`;
    }

    getCreditById(id) {
        return `${this.baseUrl}/credits/${id}`;
    }

    createCredit() {
        return `${this.baseUrl}/credits`;
    }

    removeCreditById(id) {
        return `${this.baseUrl}/credits/${id}`;
    }

    updateCreditById(id) {
        return `${this.baseUrl}/credits/${id}`;
    }
}

export const creditUrls = new CreditUrls();