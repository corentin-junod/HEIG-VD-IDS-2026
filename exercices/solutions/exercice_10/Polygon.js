import Point, {ORIGIN} from './Point.js'

export default class Polygon{
    #points; // Attribut privé, pour empêcher toute modification

    constructor(pointsArray){
        // Ici on doit utiliser "Array.from" pour faire une copie du tableau, car le tableau est passé par référence.
        // A noter que "Array.from" ne fait qu'une copie superficielle (shallow copy), les éléments du tableau, ici les Point, ne sont pas dupliqués
        // On se retrouve donc avec deux tableaux différents, this.#points et pointsArray, qui contiennent les mêmes Point. Modifier un Point dans pointsArray va donc modifier ce Point dans this.#points !
        // Dans notre cas, ce n'est pas un problème, car un Point est immuable, on ne pourra donc jamais le modifier (ouf!). Par contre si Point n'était pas immuable, il faudrait bien dupliqués les Point.
        this.#points = Array.from(pointsArray);
    }

    addPoint(point){
        return new Polygon(this.#points.concat([point]));
    }

    getArea(){ 
        // Pris de https://en.wikipedia.org/wiki/Shoelace_formula
        const pointsLoop = this.#points.concat(this.#points[0]);
        const doubleSignedArea = this.#points.reduce((acc, point, i) => acc + (point.getY()+pointsLoop[i+1].getY()) * (point.getX()-pointsLoop[i+1].getX()), 0); 
        return Math.abs(doubleSignedArea/2); 
    }

    getPerimeter(){ 
        const pointsLoop = this.#points.concat(this.#points[0]);
        return this.#points.reduce( (acc, point, i) => acc + point.distanceTo(pointsLoop[i+1]), 0); 
    }

    translate(dx, dy){
        return new Polygon(this.#points.map(p => p.translate(dx, dy)));
    }

    getCenter(){ 
        return new Point(
            this.#points.reduce((acc, point) => acc + point.getX(), 0) / this.#points.length, 
            this.#points.reduce((acc, point) => acc + point.getY(), 0) / this.#points.length
        );
    }

    getPoints(){
        // De la même manière que pour le constructeur, il faut ici retourner une copie du tableau, sans quoi il pourrait y avoir un effet de bord.
        // En général, on devrait faire une copie également de tous les Point du tableau, mais comme ceux-ci sont immuables, ce n'est pas nécessaire ici.
        return Array.from(this.#points);
    }

}

// Comme Polygon est immuables, ces constantes sont immuables et il n'y a rien besoin de modifier ici
export const ORIGIN_SQUARE = new Polygon([ORIGIN, new Point(0,1), new Point(1,1), new Point(1,0)]);
export const ORIGIN_TRIANGLE = new Polygon([ORIGIN, new Point(0,1), new Point(1,0)]);