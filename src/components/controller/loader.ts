class Loader {
    baseLink: string; // Базовый URL для запросов
    options: {}; // Опции для запросов

    constructor(baseLink: string | undefined, options: {}) {
        if (baseLink !== undefined) {
            this.baseLink = baseLink;
        } else {
            // Обработка случая, когда baseLink undefined
            this.baseLink = "default";
        }
        
        // console.log(baseLink);
        this.options = options;
    }

    // Метод для отправки GET запроса
    getResp(
        { endpoint, options  = {} }: { endpoint: string, options: Record<string, string> },
        callback = (data: Record<string, string>) => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    // Обработчик ошибок запроса
    errorHandler(res: Response) {   // Заменил тип на Response
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    // Создание URL для запроса
    makeUrl(options: Record<string, string>, endpoint: string) {
        console.log(options);
        
        const urlOptions: { [key: string]: string; } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    // Отправка запроса
    load(method: string, endpoint: string, callback: (data: Record<string, string>) => void, options = {}) {
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
