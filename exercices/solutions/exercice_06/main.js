import BaseSlider from "./BaseSlider.js";
import PercentageSlider from "./PercentageSlider.js";
import ExponentialSlider from "./ExponentialSlider.js";
import ColorSelector from "./ColorSelector.js";


const content = document.getElementById("content");
const baseSlider = new BaseSlider(content, "Slider basique", 0, 100);
content.append(document.createElement("br"));

const percentageSlider = new PercentageSlider(content, "Slider pourcent");
content.append(document.createElement("br"));

const exponentialSlider = new ExponentialSlider(content, "Slider au carré", 1, 15, 2);
content.append(document.createElement("br"));

const colorText = document.createElement("p");
colorText.textContent = "Sélecteur de couleur";
content.append(colorText);
const colorSelector = new ColorSelector(content)
const colorDiv = document.getElementById("color");
colorSelector.setOnChange(color => colorDiv.style.backgroundColor = color);


