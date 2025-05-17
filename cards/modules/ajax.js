class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<{data: any, status: number}>}
     */
    async get(url) {
        try {
            const response = await fetch(url, {
                method: 'GET'
            });
            return this._handleResponse(response);
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @returns {Promise<{data: any, status: number}>}
     */
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return this._handleResponse(response);
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @returns {Promise<{data: any, status: number}>}
     */
    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return this._handleResponse(response);
        } catch (error) {
            console.error('PATCH request failed:', error);
            throw error;
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<{data: any, status: number}>}
     */
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            return this._handleResponse(response);
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    }

    /**
     * PUT запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    put(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    /**
     * Обработчик ответа (приватный метод)
     * @param {Response} response - Объект ответа
     * @returns {Promise<{data: any, status: number}>}
     */
    async _handleResponse(response) {
        const text = await response.text();
        let data = null;
        
        if (text) {
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('JSON parsing error:', e);
            }
        }
        
        return {
            data,
            status: response.status
        };
    }
}

export const ajax = new Ajax();