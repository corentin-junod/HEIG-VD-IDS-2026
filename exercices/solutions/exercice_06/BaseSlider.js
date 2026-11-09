export default class BaseSlider {
    constructor(parent, label, min, max) {
        this.container = document.createElement("div");
        this.labelEl = document.createElement("span");
        this.valueEl = document.createElement("span");
        this.inputEl = document.createElement("input");
        this.container.append(this.labelEl, this.inputEl, this.valueEl);
        parent.append(this.container);

        this.inputEl.type = "range";
        this.inputEl.min = min;
        this.inputEl.max = max;
        this.inputEl.value = min;

        this.labelEl.textContent = label + " : ";

        this.onChangeCallback = null;

        this.inputEl.addEventListener("input", () => this.updateValue());
        this.updateValue();
    }

    updateValue() {
        this.valueEl.textContent = this.inputEl.value;
        if(this.onChangeCallback != null){
            this.onChangeCallback(this.getValue)
        }
    }

    getValue(){
        return Number(this.valueEl.textContent);
    }

    setOnChange(callback){
        this.onChangeCallback = callback;
    }
}