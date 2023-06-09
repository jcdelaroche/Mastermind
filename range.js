
class Slider {
    constructor (rangeElement, valueElement, options) {
      this.rangeElement = rangeElement;
      this.valueElement = valueElement;
      this.options = options;
  
      // Attach a listener to "change" event
      this.rangeElement.addEventListener('input', this.updateSlider.bind(this));
    }
  
    // Initialize the slider
    init() {
      this.rangeElement.setAttribute('min', options.min);
      this.rangeElement.setAttribute('max', options.max);
      this.rangeElement.value = options.cur;
  
      this.updateSlider();
    }
  
    generateBackground() {   
      if (this.rangeElement.value === this.options.min) {
        return;
      }
  
      let percentage =  (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100;
      return 'background: linear-gradient(to right, #50299c, #7a00ff ' + percentage + '%, #d3edff ' + percentage + '%, #dee1e2 100%)';
    }
  
    updateSlider () {
      this.valueElement.innerHTML = parseFloat(this.rangeElement.value);
      this.rangeElement.style = this.generateBackground();
    }
  }
  
  let rangeElement = document.querySelector('.range [type="range"]');
  let valueElement = document.querySelector('.range .range__value span') ;
  
  let options = {
    min: 1,
    max: 20,
    cur: 10
  };
  
  if (rangeElement) {
    let slider = new Slider(rangeElement, valueElement, options);
  
    slider.init();
  }