class Loader {
    baseLink: any; // Базовый URL для запросов
    options: any; // Опции для запросов

    constructor(baseLink: any, options: any) {
        this.baseLink = baseLink;
        this.options = options;
    }

    // Метод для отправки GET запроса
    getResp(
        { endpoint, options  = {} }: { endpoint: string, options: Record<string, any> },
        callback = (data: any) => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    // Обработчик ошибок запроса
    errorHandler(res: any) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    // Создание URL для запроса
    makeUrl(options: any, endpoint: any) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    // Отправка запроса
    load(method: any, endpoint: any, callback: any, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler) // Обработка ошибок
            .then((res) => res.json()) // Преобразование ответа в JSON
            .then((data) => callback(data)) // Вызов callback функции с данными ответа
            .catch((err) => console.error(err)); // Обработка ошибок
    }
}

// Экспорт класса Loader
export default Loader;






// class Loader {
//     constructor(baseLink, options) {
//         this.baseLink = baseLink;
//         this.options = options;
//     }

//     getResp(
//         { endpoint, options = {} },
//         callback = () => {
//             console.error('No callback for GET response');
//         }
//     ) {
//         this.load('GET', endpoint, callback, options);
//     }

//     errorHandler(res) {
//         if (!res.ok) {
//             if (res.status === 401 || res.status === 404)
//                 console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
//             throw Error(res.statusText);
//         }

//         return res;
//     }

//     makeUrl(options, endpoint) {
//         const urlOptions = { ...this.options, ...options };
//         let url = `${this.baseLink}${endpoint}?`;

//         Object.keys(urlOptions).forEach((key) => {
//             url += `${key}=${urlOptions[key]}&`;
//         });

//         return url.slice(0, -1);
//     }

//     load(method, endpoint, callback, options = {}) {
//         fetch(this.makeUrl(options, endpoint), { method })
//             .then(this.errorHandler)
//             .then((res) => res.json())
//             .then((data) => callback(data))
//             .catch((err) => console.error(err));
//     }
// }

// export default Loader;
