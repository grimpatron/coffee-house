import AppController from '../controller/controller';
import { AppView } from '../view/appView';

interface NewsData {
  [key: string]: string;
}

interface SourcesData {
  [key: string]: string;
}

class App {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

//   Adds an event handler to an element with a .sources class
  start(): void {
    document
      .querySelector('.sources')
      ?.addEventListener('click', (e: Event) =>
        this.controller.getNews(e, (data: NewsData) => this.view.drawNews(data))
      );
    this.controller.getSources((data: SourcesData) => this.view.drawSources(data));
  }
}

export default App;