// =====================================================================
// Code fourni : faux serveur cartographique. NE PAS MODIFIER.
//
// Ces fonctions simulent des requêtes vers un serveur distant :
// elles répondent après un délai aléatoire, en appelant un callback
// de la forme callback(resultat, erreur).
// =====================================================================

const SERVICE_URL = "https://geo.example.ch/services/carte";

let failureRate = 0; // Probabilité qu'un appel à loadFeatures échoue (utilisé dans la partie 5)

class NetworkError extends Error {}

const LAYERS = [
    { id: "lyr_01", name: "batiments", featureCount: 152 },
    { id: "lyr_02", name: "routes",    featureCount: 87 },
    { id: "lyr_03", name: "cours_eau", featureCount: 23 },
    { id: "lyr_04", name: "forets",    featureCount: 41 }
];

function randomDelay(){
    return 300 + Math.random() * 200; // Entre 300 et 500 ms
}

// Charge la description du service.
// Résultat : { title: "...", layers: [ { id: "lyr_01", name: "batiments" }, ... ] }
function loadCapabilities(url, callback){
    setTimeout(() => {
        if(url !== SERVICE_URL){
            callback(null, new Error("Service introuvable : " + url));
            return;
        }
        callback({
            title: "Service cartographique fictif",
            layers: LAYERS.map(layer => ({ id: layer.id, name: layer.name }))
        }, null);
    }, randomDelay());
}

// Charge une couche à partir de son id.
// Résultat : { id: "lyr_01", name: "batiments", featuresUrl: "https://..." }
function loadLayer(id, callback){
    setTimeout(() => {
        const layer = LAYERS.find(layer => layer.id === id);
        if(layer === undefined){
            callback(null, new Error("Couche introuvable : " + id));
            return;
        }
        callback({
            id: layer.id,
            name: layer.name,
            featuresUrl: SERVICE_URL + "/" + layer.id + "/features"
        }, null);
    }, randomDelay());
}

// Charge les entités d'une couche.
// Résultat : [ { id: "batiments_0", type: "Feature" }, { id: "batiments_1", type: "Feature" }, ... ]
function loadFeatures(featuresUrl, callback){
    setTimeout(() => {
        if(Math.random() < failureRate){
            callback(null, new NetworkError("Erreur réseau lors du chargement de " + featuresUrl));
            return;
        }
        const layer = LAYERS.find(layer => featuresUrl === SERVICE_URL + "/" + layer.id + "/features");
        if(layer === undefined){
            callback(null, new Error("URL invalide : " + featuresUrl));
            return;
        }
        const features = [];
        for(let i = 0; i < layer.featureCount; i++){
            features.push({ id: layer.name + "_" + i, type: "Feature" });
        }
        callback(features, null);
    }, randomDelay());
}


// =====================================================================
// Partie 1 : Callbacks
// =====================================================================

function countFeaturesCallback(url, layerName, callback){
    /* A compléter */
}


// =====================================================================
// Partie 2 : Promesses
// =====================================================================

function loadCapabilitiesPromise(url){
    /* A compléter */
}

function loadLayerPromise(id){
    /* A compléter */
}

function loadFeaturesPromise(featuresUrl){
    /* A compléter */
}

function countFeaturesPromise(url, layerName){
    /* A compléter */
}


// =====================================================================
// Partie 3 : async / await
// =====================================================================

async function countFeaturesAsync(url, layerName){
    /* A compléter */
}

/*
    Question : pourquoi est-il impossible d'écrire une fonction countFeaturesSync(url, layerName),
    sans async, qui retourne directement le nombre d'entités ?

    Réponse : A compléter
*/


// =====================================================================
// Partie 4 : Plusieurs couches
// =====================================================================

async function countAllLayersSequential(url){
    /* A compléter */
}

async function countAllLayersParallel(url){
    /* A compléter */
}


// =====================================================================
// Partie 5 (bonus) : Erreurs réseau
// =====================================================================

async function countFeaturesWithRetry(url, layerName, maxAttempts){
    /* A compléter */
}


// =====================================================================
// Tests : NE PAS MODIFIER
// =====================================================================

const EXPECTED_COUNTS = { batiments: 152, routes: 87, cours_eau: 23, forets: 41 };

async function testPart(title, test){
    console.log(title + " ...");
    try {
        await test();
    } catch(error) {
        console.assert(false, title + " : erreur inattendue", error);
    }
}

function testCallback(url, layerName, check){
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            console.assert(false, "Partie 1 : le callback n'a jamais été appelé pour la couche " + layerName);
            resolve();
        }, 3000);
        countFeaturesCallback(url, layerName, (count, error) => {
            clearTimeout(timeout);
            check(count, error);
            resolve();
        });
    });
}

async function expectRejection(title, promise){
    try {
        await promise;
        console.assert(false, title + " : la promesse aurait dû être rompue");
        return null;
    } catch(error) {
        console.assert(error instanceof Error, title + " : l'erreur doit être un objet Error", error);
        return error;
    }
}

function checkAllCounts(title, result){
    console.assert(result !== undefined && result !== null, title + " : aucun résultat retourné");
    if(result === undefined || result === null) return;
    for(const name in EXPECTED_COUNTS){
        console.assert(result[name] === EXPECTED_COUNTS[name],
            title + " : la couche " + name + " devrait contenir " + EXPECTED_COUNTS[name] + " entités, obtenu", result[name]);
    }
}

async function runTests(){

    await testPart("Partie 1 : Callbacks", async () => {
        await testCallback(SERVICE_URL, "batiments", (count, error) => {
            console.assert(error === null, "Partie 1 : erreur inattendue", error);
            console.assert(count === 152, "Partie 1 : la couche batiments devrait contenir 152 entités, obtenu", count);
        });
        await testCallback(SERVICE_URL, "lacs", (count, error) => {
            console.assert(count === null, "Partie 1 : en cas d'erreur, le résultat doit être null");
            console.assert(error instanceof Error, "Partie 1 : une couche inexistante doit provoquer une erreur");
        });
        await testCallback("https://mauvaise.url", "batiments", (count, error) => {
            console.assert(count === null, "Partie 1 : en cas d'erreur, le résultat doit être null");
            console.assert(error instanceof Error, "Partie 1 : un service inexistant doit provoquer une erreur");
        });
    });

    await testPart("Partie 2 : Promesses", async () => {
        const capabilitiesPromise = loadCapabilitiesPromise(SERVICE_URL);
        console.assert(capabilitiesPromise instanceof Promise, "Partie 2 : loadCapabilitiesPromise doit retourner une promesse");
        const capabilities = await capabilitiesPromise;
        console.assert(capabilities !== undefined && capabilities.layers.length === 4, "Partie 2 : loadCapabilitiesPromise ne retourne pas la description du service");

        const layerPromise = loadLayerPromise("lyr_02");
        console.assert(layerPromise instanceof Promise, "Partie 2 : loadLayerPromise doit retourner une promesse");
        const layer = await layerPromise;
        console.assert(layer !== undefined && layer.name === "routes", "Partie 2 : loadLayerPromise ne retourne pas la bonne couche");

        const featuresPromise = loadFeaturesPromise(SERVICE_URL + "/lyr_02/features");
        console.assert(featuresPromise instanceof Promise, "Partie 2 : loadFeaturesPromise doit retourner une promesse");
        const features = await featuresPromise;
        console.assert(features !== undefined && features.length === 87, "Partie 2 : loadFeaturesPromise ne retourne pas les entités");

        await expectRejection("Partie 2 (loadLayerPromise avec un id inexistant)", loadLayerPromise("lyr_99"));

        const countPromise = countFeaturesPromise(SERVICE_URL, "forets");
        console.assert(countPromise instanceof Promise, "Partie 2 : countFeaturesPromise doit retourner une promesse");
        const count = await countPromise;
        console.assert(count === 41, "Partie 2 : la couche forets devrait contenir 41 entités, obtenu", count);

        await expectRejection("Partie 2 (couche inexistante)", countFeaturesPromise(SERVICE_URL, "lacs"));
        await expectRejection("Partie 2 (service inexistant)", countFeaturesPromise("https://mauvaise.url", "forets"));
    });

    await testPart("Partie 3 : async / await", async () => {
        const count = await countFeaturesAsync(SERVICE_URL, "cours_eau");
        console.assert(count === 23, "Partie 3 : la couche cours_eau devrait contenir 23 entités, obtenu", count);

        await expectRejection("Partie 3 (couche inexistante)", countFeaturesAsync(SERVICE_URL, "lacs"));
        await expectRejection("Partie 3 (service inexistant)", countFeaturesAsync("https://mauvaise.url", "cours_eau"));
    });

    await testPart("Partie 4 : Plusieurs couches", async () => {
        let start = performance.now();
        const sequential = await countAllLayersSequential(SERVICE_URL);
        const sequentialDuration = performance.now() - start;
        checkAllCounts("Partie 4 (séquentiel)", sequential);
        console.log("Durée du chargement séquentiel : " + Math.round(sequentialDuration) + " ms");
        console.assert(sequentialDuration > 2500, "Partie 4 : countAllLayersSequential ne semble pas charger les couches les unes après les autres");

        start = performance.now();
        const parallel = await countAllLayersParallel(SERVICE_URL);
        const parallelDuration = performance.now() - start;
        checkAllCounts("Partie 4 (parallèle)", parallel);
        console.log("Durée du chargement parallèle : " + Math.round(parallelDuration) + " ms");
        console.assert(parallelDuration < 2500, "Partie 4 : countAllLayersParallel ne semble pas charger les couches en même temps");
    });

    await testPart("Partie 5 (bonus) : Erreurs réseau", async () => {
        failureRate = 0.5;
        try {
            const count = await countFeaturesWithRetry(SERVICE_URL, "routes", 20);
            console.assert(count === 87, "Partie 5 : la couche routes devrait contenir 87 entités, obtenu", count);

            const start = performance.now();
            const error = await expectRejection("Partie 5 (couche inexistante)", countFeaturesWithRetry(SERVICE_URL, "lacs", 20));
            console.assert(!(error instanceof NetworkError), "Partie 5 : une couche inexistante ne doit pas provoquer une NetworkError");
            console.assert(performance.now() - start < 1500, "Partie 5 : une couche inexistante ne doit pas être réessayée");

            failureRate = 1;
            const networkError = await expectRejection("Partie 5 (toutes les tentatives échouent)", countFeaturesWithRetry(SERVICE_URL, "routes", 3));
            console.assert(networkError instanceof NetworkError, "Partie 5 : si toutes les tentatives échouent, l'erreur doit être une NetworkError");
        } finally {
            failureRate = 0;
        }
    });

    console.log("Tests terminés");
}

runTests();
