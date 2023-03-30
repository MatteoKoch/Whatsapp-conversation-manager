class AntwortBlock {
    
    constructor(x, y, w, h, index) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.index = index;
        this.color = "#333";
        this.created = false;
        this.nextBlockCreated = false;
        this.dataraw;
        this.data;
        this.type = "text";
        
        this.tempi = canvas.rect(x, y, 200, 200, "#333");
        this.tempi.classList.add("flow-block");
        
        this.head = document.createElement("h2");
        this.head.innerHTML = 'Anwort';
        
        this.headline = document.createElement("span");
        
        this.tempi.appendChild(this.head);
        this.tempi.appendChild(this.headline);
        
        this.addAntwortInputs();
    }
    
    changeHead(text) {
        this.headline.innerHTML = text;
    }
    
    addAddBlock() {
        let height = 50;
        let width = 50;
        let objt = this;
        this.add = canvas.rect(this.x+this.w+20, this.y+this.h/2-height/2, width, height, "#ccc");
        this.add.classList.add("add-flow");
        this.add.addEventListener("click", function(e) {
            this.remove();
            objt.nextBlock = addClientBlock();
            objt.nextBlockCreated = true;
        });
    }
    
    addAntwortInputs() {
        let objt = this;
        
        let divblock = document.createElement("div");
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `antwo_${this.index.index}`;
        radio.value = "custom";
        radio.checked = true;
        let label = document.createElement("label");
        label.innerHTML = "Text";
        
        let divblock2 = document.createElement("div");
        let radio2 = document.createElement("input");
        radio2.type = "radio";
        radio2.name = `antwo_${this.index.index}`;
        radio2.value = "template";
        let label2 = document.createElement("label");
        label2.innerHTML = "Vorlage";
        
        divblock.appendChild(radio);
        divblock.appendChild(label);
        this.tempi.append(divblock);
        divblock2.appendChild(radio2);
        divblock2.appendChild(label2);
        this.tempi.append(divblock2);
        
        // Text-Input
        this.inp = document.createElement("input");
        this.inp.type = "text"; // Oder Select (Template)
        this.inp.name = `${this.index.index}.${this.index.index0}.antwort_text`;
        this.tempi.appendChild(this.inp);
        
        // Select-Input
        this.select = document.createElement("select");
        this.inp.name = `${this.index.index}.${this.index.index0}.antwort_select`;
        for(let i = 0; i < temps.length; ++i) {
            this.select.innerHTML += `<option value='${temps[i].name}.${temps[i].language}'>${temps[i].name} (${temps[i].language})</option>`;
        }
        this.tempi.appendChild(this.select);
        
        this.form = document.createElement("div");
        this.form.classList.add("flow-form");
        
        this.tempi.appendChild(this.form);
        
        this.form.style.display = "none";;
        
        this.inp.style.display = "block";
        this.select.style.display = "none";
        
        // Text
        radio.addEventListener("change", function(e) {
            objt.inp.style.display = "block";
            objt.select.style.display = "none";
            objt.form.style.display = "none";
            objt.type = "text";
            objt.data = objt.inp.value;
            if(objt.inp.value == '') {
                objt.created = false;
                objt.add.remove();
            }
        });
        
        // Template
        radio2.addEventListener("change", function(e) {
            objt.inp.style.display = "none";
            objt.select.style.display = "block";
            objt.form.style.display = "flex";
            objt.type = "template";
            objt.dataraw = templates.data[objt.select.selectedIndex];
            createInputs(objt.data = deconstruct(templates.data[objt.select.selectedIndex], objt.select.value), objt.form);
            if(!objt.created && !objt.nextBlockCreated) {
                objt.created = true;
                objt.addAddBlock();
            }
        });
        
        let created = false;
        this.inp.addEventListener("input", function(e) {
            objt.data = this.value;
            if(this.value != '' && !objt.created && !objt.nextBlockCreated) {
                objt.created = true;
                objt.addAddBlock();
            } else if(this.value == '') {
                objt.created = false;
                objt.add.remove();
            }
        });
        this.inp.addEventListener("keydown", function(e) {            
            if(e.key == 'Enter' && !objt.nextBlockCreated) {
                objt.nextBlock = addClientBlock();
                objt.nextBlockCreated = true;
                objt.created = false;
                objt.add.remove();
            }
        });
    }
    
}