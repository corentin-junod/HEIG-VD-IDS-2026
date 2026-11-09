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
    /* A compléter */
}

async function loadCollectionItems(url) {
    /* A compléter */
}

