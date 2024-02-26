import './news.css';

// Определение интерфейса для элемента новостей
interface NewsItem {
    urlToImage: string | null;
    author: string | null;
    source: { name: string };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}

class News {
    // Метод для отрисовки новостей на странице
    draw(data: NewsItem[]): void {
        // Ограничиваем количество новостей до 10
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        // Проверка на наличие шаблона новости на странице
        if (newsItemTemp === null) {
            throw new Error("Template element '#newsItemTemp' not found");
        }

        // Проходим по каждому элементу новости
        news.forEach((item, idx) => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            // Добавляем класс 'alt' для каждой второй новости
            if (idx % 2) (newsClone.querySelector('.news__item') as HTMLElement).classList.add('alt');

            // Заполняем данные новости в шаблон
            (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;
            (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
            (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
            (newsClone.querySelector('.news__read-more a') as HTMLAnchorElement).setAttribute('href', item.url);

            // Добавляем новость в фрагмент
            fragment.append(newsClone);
        });

        // Находим контейнер для новостей на странице
        const newsContainer = document.querySelector('.news');
        // Проверка на наличие контейнера на странице
        if (newsContainer === null) {
            throw new Error("News container '.news' not found");
        }
        // Очищаем контейнер и добавляем в него новости
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

// Экспортируем класс News
export default News;






// import './news.css';

// class News {
//     draw(data) {
//         const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

//         const fragment = document.createDocumentFragment();
//         const newsItemTemp = document.querySelector('#newsItemTemp');

//         news.forEach((item, idx) => {
//             const newsClone = newsItemTemp.content.cloneNode(true);

//             if (idx % 2) newsClone.querySelector('.news__item').classList.add('alt');

//             newsClone.querySelector('.news__meta-photo').style.backgroundImage = `url(${
//                 item.urlToImage || 'img/news_placeholder.jpg'
//             })`;
//             newsClone.querySelector('.news__meta-author').textContent = item.author || item.source.name;
//             newsClone.querySelector('.news__meta-date').textContent = item.publishedAt
//                 .slice(0, 10)
//                 .split('-')
//                 .reverse()
//                 .join('-');

//             newsClone.querySelector('.news__description-title').textContent = item.title;
//             newsClone.querySelector('.news__description-source').textContent = item.source.name;
//             newsClone.querySelector('.news__description-content').textContent = item.description;
//             newsClone.querySelector('.news__read-more a').setAttribute('href', item.url);

//             fragment.append(newsClone);
//         });

//         document.querySelector('.news').innerHTML = '';
//         document.querySelector('.news').appendChild(fragment);
//     }
// }

// export default News;