import './sources.css';

interface SourceData {
    name: string;
    id: string;
}

class Sources {
    draw(data: SourceData[]): void {
        
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        const sourcesContainer: HTMLElement | null = document.querySelector('.sources');

        if (sourceItemTemp === null) {
            throw new Error("Item template not found"); // #sourceItemTemp
        }

        // For each data element, create a clone of the template and fill it with values
        data.forEach((item: SourceData) => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        if (sourcesContainer === null) {
            throw new Error("Container for sources not found");  //.sources
        }

        // Clean the container and add news to it
        sourcesContainer.innerHTML = '';
        sourcesContainer.append(fragment);
    }
}

export default Sources;