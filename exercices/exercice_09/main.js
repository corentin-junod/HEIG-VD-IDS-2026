import Point, {ORIGIN} from './Point.js'
import Polygon, {ORIGIN_SQUARE, ORIGIN_TRIANGLE } from "./Polygon.js";

const p0 = new Point(0,0);
const p1 = p0.translate(10, 5);

console.assert(p0.getX() === 0 && p0.getY() === 0, "Erreur : p0 doit rester inchangé");
console.assert(p1.getX() === 10 && p1.getY() === 5, "Erreur : p1 doit avec la bonne position");


const poly0Points = [new Point(0,0), new Point(1,1), new Point(0,1)];
const poly0 = new Polygon(poly0Points);
poly0Points.push(new Point(0, -1));
console.assert(poly0.getPoints().length === 3, "Erreur : La liste des sommets d'un polygon ne doit pas pouvoir être modifiée");

const poly1 = poly0.addPoint(new Point(0, -1))
console.assert(poly0.getPoints().length === 3, "Erreur : La liste des sommets d'un polygon ne doit pas pouvoir être modifiée");
console.assert(poly1.getPoints().length === 4, "Erreur : La fonction addPoint doit produire un polygone avec un point supplémentaire");

const poly2 = poly1.translate(5, 5);
console.assert(poly2.getPoints().length === 4, "Erreur : poly2 ne possède pas le bon nombre de sommets");
console.assert(poly2.getPoints()[1].getX() === 6 && poly2.getPoints()[2].getY() === 6, "Erreur : poly2 n'est pas placé au bon endroit");
console.assert(poly1.getPoints()[1].getX() === 1 && poly1.getPoints()[2].getY() === 1, "Erreur : poly1 a été déplacé avec poly2");

const poly2Points = poly2.getPoints();
poly2Points.pop();
console.assert(poly2.getPoints().length === 4, "Erreur : Les sommets de poly2 ont pu être modifiés");

console.log("Si aucune erreur ne s'affiche, tous les tests ont réussi.")