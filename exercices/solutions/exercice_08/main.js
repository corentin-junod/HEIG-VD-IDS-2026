const collectionInfo = document.getElementById("collection-info");
const childCollectionTitle = document.getElementById("childCollection-title");
const childCollectionInfo = document.getElementById("childCollection-info");
const itemsInfo = document.getElementById("items-info");
const itemsTitle = document.getElementById("items-title");

document.getElementById("load-btn").addEventListener("click", () => {
    loadCollectionItems(document.getElementById("stac-url").value)
});

document.getElementById("reset-btn").addEventListener("click", () => reset());

function reset(){
    itemsInfo.innerHTML = '';
    itemsTitle.innerHTML = 'Items';
    collectionInfo.innerHTML = '';
    childCollectionInfo.innerHTML = '';
    childCollectionTitle.innerHTML = 'Sous-Collections'
}

async function loadCollectionItems(url) {
    reset()
    const response = await fetch(url);
    const json = await response.json()
    collectionInfo.innerHTML = `
        <h2>${json.title}</h2>
        <p>${json.description}</p>
    `;
    loadChildCollections(json);
    loadItems(json);
}

function loadChildCollections(collectionJson){
    const collectionLinks = collectionJson.links.filter(l => l.rel == 'child');
    const ul = document.createElement("ul");
    collectionLinks.forEach(link => {
        const li = document.createElement("li");
        li.textContent = link.title;
        ul.appendChild(li);
    });
    childCollectionInfo.appendChild(ul);
    childCollectionTitle.textContent = `Sous-Collections (${collectionLinks.length})`;
}

async function loadItems(collectionJson){
    const itemLinks = collectionJson.links.filter(l => l.rel == 'item');
    const ul = document.createElement("ul");
    let counter = 0;
    itemLinks.forEach(async link => {  // Notez l'async ici, nécessaire, car on doit "await getJson" pour charger l'item
        const response = await fetch(link.href);
        const json = await response.json();
        const li = document.createElement("li");
        li.textContent = json.id;
        ul.appendChild(li);
        counter++;
        itemsTitle.textContent = `Items (${counter}/${itemLinks.length})`;
    });
    itemsInfo.appendChild(ul);
}

