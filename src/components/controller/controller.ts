import AppLoader from './appLoader';

interface IRequestParams {
  endpoint: string;
  options: Record<string, string>;
}

class AppController extends AppLoader {
  getSources(callback: (data: Record<string, string>) => void): void {
    const params: IRequestParams = {
      endpoint: 'sources',
      options: {},
    };
    super.getResp(params, callback);
  }

  // Method for receiving news from a specific source
  getNews(e: Event, callback: (data: Record<string, string>) => void): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    // Loop through the elements until we find the news container
    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          const params: IRequestParams = {
            endpoint: 'everything',
            options: {
              sources: sourceId,
            },
          };
          super.getResp(params, callback);
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;