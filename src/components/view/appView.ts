import Sources from "./sources/sources";
import News from "./news/news";

// Defining interfaces
interface NewsItem {
    urlToImage: string;
    author: string;
    source: { name: string };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}
interface SourceItem {
    name: string;
    id: string;
}
interface Data {
    articles?: Array<NewsItem>;
    sources?: Array<SourceItem>;
}

// Defining class
export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    // Declaring types for function parameters and handling cases where functions do not return a value
    drawNews(data: Data): void {
        const values: Array<NewsItem> = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Data): void {
        const values: Array<SourceItem> = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;