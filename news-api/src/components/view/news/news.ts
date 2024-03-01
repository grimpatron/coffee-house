import './news.css';

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
    draw(data: NewsItem[]): void {

        const news: NewsItem[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        const newsContainer: HTMLElement | null = document.querySelector('.news');

        
        // Checking for the presence of a news template on the page
        if (newsItemTemp === null) {
            throw new Error("Template element not found!"); // '#newsItemTemp'
        }

        news.forEach((item: NewsItem, idx: number) => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            // Add an 'alt' class for every second news
            if (idx % 2) (newsClone.querySelector('.news__item') as HTMLElement).classList.add('alt');

            // Fill in the news data into the template
            (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;

            (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;
            (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                .slice(0, 10).split('-').reverse().join('-');

            (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
            (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
            (newsClone.querySelector('.news__read-more a') as HTMLAnchorElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        // closes the news selection window
        const container = document.querySelector('.sources');
        container?.classList.remove('source--expanded');

        // Find the container for news on the page and check for the presence of a container on the page
        if (newsContainer === null) {
            throw new Error("News container '.news' not found");
        }
        
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;