import Point, {ORIGIN} from './Point.js'
import Polygon, {ORIGIN_SQUARE, ORIGIN_TRIANGLE } from "./Polygon.js";

{

    console.log("Création d'un point, et test de la méthode translate ...")
    
    const p0 = new Point(0,0);
    console.assert(p0.getX() === 0, "Erreur lors de la création d'un point à l'origine");
    console.assert(p0.getY() === 0, "Erreur lors de la création d'un point à l'origine");
    
    const p0_translated = p0.translate(-4, 5);
    console.assert(p0_translated.getX() === -4, "Erreur lors de l'appel à la fonction translate de Point ");
    console.assert(p0_translated.getY() === 5,  "Erreur lors de l'appel à la fonction translate de Point ");
    
    const p0_translated_2 = p0_translated.translate(7, -6);
    console.assert(p0_translated_2.getX() === 3,   "Erreur lors de l'appel à la fonction translate de Point ");
    console.assert(p0_translated_2.getY() === -1), "Erreur lors de l'appel à la fonction translate de Point ";
    
    
    console.log("Création d'un deuxième point, et test de la méthode distanceTo ... ")
    const p1 = new Point(3, -1);
    console.assert(p0_translated_2.distanceTo(p1) === 0, "Erreur lors du calcul de la distance d'un point à un même point");
    
    const p1_translated = p1.translate(3, -4);
    console.assert(p0_translated_2.distanceTo(p1_translated) === 5, "Erreur lors du calcul de la distance entre deux points");
    
    
    console.log("Création d'un triangle simple ...")
    
    const triangle = new Polygon([new Point(0,0), new Point(0,3), new Point(4,0)]);
    console.assert(triangle.getPerimeter() === 12, "Erreur lors du calcul du périmètre d'un triangle simple");
    console.assert(triangle.getArea() === 6, "Erreur lors du calcul de l'aire d'un triangle simple");
    const triangleCenter = triangle.getCenter();
    console.assert(triangleCenter.getX() === 4/3, "Erreur lors du calcul du centre d'un triangle simple");
    console.assert(triangleCenter.getY() === 1, "Erreur lors du calcul du centre d'un triangle simple"); 
    
    const triangle_translated = triangle.translate(3.65, -5.78);
    console.assert(triangle_translated.getPerimeter() === 12, "Erreur lors du calcul du périmètre d'un triangle simple translaté");
    console.assert(triangle_translated.getArea() === 6, "Erreur lors du calcul de l'aire d'un triangle simple translaté");
    const triangleTranslateCenter = triangle_translated.getCenter();
    console.assert(triangleTranslateCenter.getX() === 4/3 + 3.65, "Erreur lors du calcul du centre d'un triangle simple translaté");
    console.assert(triangleTranslateCenter.getY() === 1 - 5.78, "Erreur lors du calcul du centre d'un triangle simple translaté"); 
    
    
    
    console.log("Création d'un quadrilatère ...")
    
    const quad = new Polygon([new Point(-6, -4), new Point(-5, 3), new Point(1, 4), new Point(2, -3)]);
    console.assert(quad.getPerimeter().toFixed(5) == 28.28716, "Erreur lors du calcul du périmètre d'un quadrilatère");
    console.assert(quad.getArea() === 49, "Erreur lors du calcul de l'aire d'un quadrilatère");
    const quadCenter = quad.getCenter();
    console.assert(quadCenter.getX() === -2, "Erreur lors du calcul du centre d'un quadrilatère");
    console.assert(quadCenter.getY() === 0, "Erreur lors du calcul du centre d'un quadrilatère"); 
    
    
    console.log("Ajout d'un point au quadrilatère ...")
    const new_quad = quad.addPoint(new Point(-3, -6));
    console.assert(new_quad.getPerimeter().toFixed(5) == 29.66140, "Erreur lors du calcul du périmètre d'un quadrilatère");
    console.assert(new_quad.getArea() === 58.5, "Erreur lors du calcul de l'aire d'un quadrilatère");
    const quadWithAddedPointCenter = new_quad.getCenter();
    console.assert(quadWithAddedPointCenter.getX() === -2.2, "Erreur lors du calcul du centre d'un quadrilatère");
    console.assert(quadWithAddedPointCenter.getY() === -1.2, "Erreur lors du calcul du centre d'un quadrilatère"); 
    
    
    
    console.log("Vérification de la constante ORIGIN ... ")
    console.assert(ORIGIN.getX() === 0, "ORIGIN n'est pas à l'origine")
    console.assert(ORIGIN.getY() === 0, "ORIGIN n'est pas à l'origine")
    
    console.log("Vérification de la constante ORIGIN_SQUARE ... ")
    console.assert(ORIGIN_SQUARE.getArea() === 1, "ORIGIN_SQUARE n'a pas la bonne aire")
    console.assert(ORIGIN_SQUARE.getPerimeter() === 4, "ORIGIN_SQUARE n'a pas le bon périmètre")
    console.assert(ORIGIN_SQUARE.getCenter().getX() === 0.5, "ORIGIN_SQUARE n'est pas au bon endroit")
    console.assert(ORIGIN_SQUARE.getCenter().getY() === 0.5, "ORIGIN_SQUARE n'est pas au bon endroit")
    
    console.log("Vérification de la constante ORIGIN_TRIANGLE ... ")
    console.assert(ORIGIN_TRIANGLE.getArea() === 0.5, "ORIGIN_TRIANGLE n'a pas la bonne aire")
    console.assert(ORIGIN_TRIANGLE.getPerimeter() === 2 + Math.sqrt(2), "ORIGIN_TRIANGLE n'a pas le bon périmètre")
    console.assert(ORIGIN_TRIANGLE.getCenter().getX() === 1/3, "ORIGIN_TRIANGLE n'est pas au bon endroit")
    console.assert(ORIGIN_TRIANGLE.getCenter().getY() === 1/3, "ORIGIN_TRIANGLE n'est pas au bon endroit")
}

{
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
}

console.log("Si aucune erreur ne s'affiche, tous les tests ont réussi.")