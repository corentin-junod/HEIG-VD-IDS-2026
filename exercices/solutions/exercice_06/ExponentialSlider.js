import BaseSlider from "./BaseSlider.js";

export default class ExponentialSlider extends BaseSlider {
    constructor(parent, label, min, max, exponent) {
        super(parent, label, min, max);
        this.exponent = exponent;
        this.updateValue();
    }

    updateValue() {
        super.updateValue();
        this.valueEl.textContent = Math.pow(this.inputEl.value, this.exponent);
    }
}
