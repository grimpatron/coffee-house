// Импортируем стили из файла sources.css
import './sources.css';

// Определяем интерфейс для данных источников
interface SourceData {
    name: string; // Название источника
    id: string; // Идентификатор источника
}

// Создаем класс Sources
class Sources {
    // Метод draw принимает массив данных и отрисовывает их
    draw(data: SourceData[]): void {
        // Создаем фрагмент документа для временного хранения элементов
        const fragment: DocumentFragment = document.createDocumentFragment();
        // Получаем шаблон элемента источника
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        // Проверяем, что шаблон существует
        if (sourceItemTemp === null) {
            throw new Error("Шаблон элемента '#sourceItemTemp' не найден");
        }

        // Для каждого элемента данных создаем клон шаблона и заполняем его значениями
        data.forEach((item: SourceData) => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            // Устанавливаем название источника
            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            // Устанавливаем идентификатор источника
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            // Добавляем клон во фрагмент
            fragment.append(sourceClone);
        });

        // Получаем контейнер для источников
        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer === null) {
            throw new Error("Контейнер для источников '.sources' не найден");
        }
        // Добавляем фрагмент в контейнер
        sourcesContainer.append(fragment);
    }
}

// Экспортируем класс Sources
export default Sources;





// import './sources.css';

// class Sources {
//     draw(data) {
//         const fragment = document.createDocumentFragment();
//         const sourceItemTemp = document.querySelector('#sourceItemTemp');

//         data.forEach((item) => {
//             const sourceClone = sourceItemTemp.content.cloneNode(true);

//             sourceClone.querySelector('.source__item-name').textContent = item.name;
//             sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

//             fragment.append(sourceClone);
//         });

//         document.querySelector('.sources').append(fragment);
//     }
// }

// export default Sources;