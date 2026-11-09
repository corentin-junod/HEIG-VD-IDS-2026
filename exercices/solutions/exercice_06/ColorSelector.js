import BaseSlider from "./BaseSlider.js";

export default class ColorSelector {
    constructor(parent) {
        this.container = document.createElement("div");
        this.r = new BaseSlider(this.container, "R", 0 ,255);
        this.g = new BaseSlider(this.container, "G", 0 ,255);
        this.b = new BaseSlider(this.container, "B", 0 ,255);

        this.onChangeCallback = null;

        this.r.setOnChange(() => this.updateValue());
        this.g.setOnChange(() => this.updateValue());
        this.b.setOnChange(() => this.updateValue());

        parent.appendChild(this.container);
    }

    updateValue(){
        if(this.onChangeCallback != null){
            this.onChangeCallback(this.getColor());
        }
    }

    getColor(){
        return "rgb("+this.r.getValue()+", "+this.g.getValue()+", "+this.b.getValue()+")";
    }

    setOnChange(callback){
        this.onChangeCallback = callback;
    }
}