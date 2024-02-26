// import { News } from './news/news';
// import { Sources } from './sources/sources';
import Sources from "./sources/sources"
import News from "./news/news"
interface INewsItem {
    urlToImage: string;
    author: string;
    source: { name: string }; // Изменил
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    // name: string;
    // id: string;
}
interface ISourceItem {
    name: string;
    id: string;
}

interface IData {
    articles?: Array<INewsItem>;
    sources?: Array<ISourceItem>;
}
// interface IData {
//     articles?: Array<object>;
//     sources?: Array<object>;
// }

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;





// import News from './news/news';
// import Sources from './sources/sources';

// export class AppView {
//     constructor() {
//         this.news = new News();
//         this.sources = new Sources();
//     }

//     drawNews(data) {
//         const values = data?.articles ? data?.articles : [];
//         this.news.draw(values);
//     }

//     drawSources(data) {
//         const values = data?.sources ? data?.sources : [];
//         this.sources.draw(values);
//     }
// }

// export default AppView;
