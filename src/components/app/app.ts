// Импорт классов AppController и AppView
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

// Определение класса App
class App {
    // Добавление типов для свойств controller и view
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    // Добавление типа возвращаемого значения для метода start
    start(): void {
        document
            .querySelector('.sources')
            // Добавление типов для параметров функции обратного вызова
            ?.addEventListener('click', (e: Event) => this.controller.getNews(e, (data: any) => this.view.drawNews(data)));
        this.controller.getSources((data: any) => this.view.drawSources(data));
    }
}

// Экспорт класса App
export default App;



// import AppController from '../controller/controller';
// import { AppView } from '../view/appView';

// class App {
//     constructor() {
//         this.controller = new AppController();
//         this.view = new AppView();
//     }

//     start() {
//         document
//             .querySelector('.sources')
//             .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
//         this.controller.getSources((data) => this.view.drawSources(data));
//     }
// }

// export default App;