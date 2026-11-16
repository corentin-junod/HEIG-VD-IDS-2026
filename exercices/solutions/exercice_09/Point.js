export default class Point {
    // On déclare x et y comme attributs privés, empêchant toute modification
    #x;
    #y;
    constructor(x, y){ 
        // Ici on suppose que x et y sont des nombres, donc pas d'effet de bord, car passage par valeur
        // On pourrait éventuellement tester le type de x et de y pour bien s'assurer qu'ils s'agit de nombres, mais ce n'est pas explicitement demandé
        this.#x = x;
        this.#y = y;
    }

    distanceTo(otherPoint){ // Cette fonction retourne un nombre, pas d'effet de bord
        return Math.sqrt( Math.pow(this.#x - otherPoint.#x, 2) + Math.pow(this.#y - otherPoint.#y, 2) );
    }

    translate(dx, dy){
        return new Point(this.#x + dx, this.#y + dy);
    }

    getX(){
        return this.#x;
    }

    getY(){
        return this.#y;
    }
}

export const ORIGIN = new Point(0,0); // Rien besoin de changer ici : comme Point est immuable, toutes les instances de la classe sont immuables.