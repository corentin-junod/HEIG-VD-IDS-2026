import BaseSlider from "./BaseSlider.js";

export default class PercentageSlider extends BaseSlider {
    constructor(parent, label) {
        super(parent, label, 0, 100);
    }

    updateValue() {
        super.updateValue();
        this.valueEl.textContent = this.inputEl.value + " %";
    }
}