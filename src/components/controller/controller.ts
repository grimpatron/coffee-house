import AppLoader from './appLoader';

// Класс AppController наследуется от AppLoader
class AppController extends AppLoader {
    // Метод для получения источников новостей
    getSources(callback: (data: Record<string, string>) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
                options: {},
            },
            callback
        );
    }

    // Метод для получения новостей от определенного источника
    getNews(e: Event, callback: (data: Record<string, string>) => void): void  {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        // Перебираем элементы, пока не найдем контейнер новостей
        while (target !== newsContainer) {
            // Если элемент является источником новостей
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                // Если источник новостей изменился, обновляем новости
                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

// Экспортируем класс AppController
export default AppController;





// import AppLoader from './appLoader';

// class AppController extends AppLoader {
//     getSources(callback) {
//         super.getResp(
//             {
//                 endpoint: 'sources',
//             },
//             callback
//         );
//     }

//     getNews(e, callback) {
//         let target = e.target;
//         const newsContainer = e.currentTarget;

//         while (target !== newsContainer) {
//             if (target.classList.contains('source__item')) {
//                 const sourceId = target.getAttribute('data-source-id');
//                 if (newsContainer.getAttribute('data-source') !== sourceId) {
//                     newsContainer.setAttribute('data-source', sourceId);
//                     super.getResp(
//                         {
//                             endpoint: 'everything',
//                             options: {
//                                 sources: sourceId,
//                             },
//                         },
//                         callback
//                     );
//                 }
//                 return;
//             }
//             target = target.parentNode;
//         }
//     }
// }

// export default AppController;
