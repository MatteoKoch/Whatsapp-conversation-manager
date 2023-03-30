class DivDraw {
    
    constructor(el, w = 300, h = 300) {
        this.elem = el;
        this.width = w;
        this.height = h;
        this.back = '#f1f1f1';
        this.initCanvas();
    }
    
    initCanvas() {
        this.setBackground();
        this.setSize();
        this.initStyle();
    }
    
    initStyle() {
        this.elem.style.position = 'relative';
        this.elem.style.overflow = 'hidden';
    }
    
    setSize(w = this.width, h = this.height) {
        this.elem.style.width = `${w}px`;
        this.elem.style.height = `${h}px`;
        this.elem.setAttribute("width", w);
        this.elem.setAttribute("height", h);
    }
    
    setBackground(col = this.back) {
        this.elem.style.background = col;
    }
    
    rect(x, y, w = 1, h = 1, col = 'red') {
        var pixel = document.createElement("div");
        pixel.style.position = 'absolute';
        pixel.style.left = `${x}px`;
        pixel.style.top = `${y}px`;
        pixel.style.width = `${w}px`;
        pixel.style.height = `${h}px`;        
        pixel.style.background = col;
        this.elem.appendChild(pixel);
    }
    
    ellipse(x, y, w, h, col = 'red') {
        var kreis = document.createElement("div");
        kreis.style.position = 'absolute';
        kreis.style.left = `${x-(w/2)}px`;
        kreis.style.top = `${y-(h/2)}px`;
        kreis.style.width = `${w}px`;
        kreis.style.height = `${h}px`;
        kreis.style.background = col;
        kreis.style.borderRadius = '50%';
        this.elem.appendChild(kreis);
    }
    
    line(x1, y1, x2, y2, col = 'red', stroke = 1) {
        let w = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
        let angle = Math.asin((y2-y1)/w);
        let line = document.createElement("div");
        line.style.position = 'absolute';
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.width = `${w}px`;
        line.style.height = `${stroke}px`;
        line.style.transform = `rotate(${angle}rad)`;
        line.style.transformOrigin = '0';
        line.style.background = col;
        this.elem.appendChild(line);
    }
    
    clear() {
        this.elem.innerHTML = '';
    }
    
}