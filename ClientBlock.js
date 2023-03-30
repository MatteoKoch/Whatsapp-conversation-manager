class ClientBlock {
    
    constructor(x, y, w, h, index) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.index = index;
        this.color = "red";
        this.created = false;
        this.nextBlockCreated = false;
        this.data;
        this.type = "text";
        
        this.tempi = canvas.rect(x, y, 200, 200, "#9c1000");
        this.tempi.classList.add("flow-block");
        
        this.addClientInputs();
        this.tempi.appendChild(this.inp);
    }
    
//    addAddBlock() {
//        let height = 50;
//        let width = 50;
//        let objt = this;
//        this.add = canvas.rect(this.x+this.w+20, this.y+this.h/2-height/2, width, height, '#ccc');
//        this.add.classList.add("add-flow");
//        this.add.addEventListener("click", function(e) {
//            this.remove();
//            objt.nextBlock = addAntwortBlock();
//            objt.nextBlock.changeHead(objt.inp.value);
//            objt.nextBlockCreated = true;
//        });
//    }
    
    addAddBlockAtLayer() {
        let height = 50;
        let width = 50;
        let objt = this;
        this.addAtLayer = canvas.rect((this.x+this.w/2)-width/2, this.y+this.h+20, width, height, "#ccc");
        this.addAtLayer.classList.add("add-flow");
        this.addAtLayer.addEventListener("click", function(e) {
            this.remove();
            objt.nextBlock = addClientBlock(true);
        });
    }
    
    addClientInputs() {
        let objt = this;        
        this.inp = document.createElement("input");
        this.inp.type = "text";
        this.inp.name = `${this.index.index}.${this.index.index0}.client`;
        let created = false;
        this.addAddBlockAtLayer();
        this.inp.addEventListener("input", function(e) {
            objt.data = this.value;
            if(this.value != '' && !objt.created && !objt.nextBlockCreated) {
//                objt.created = true;
//                objt.addAddBlock();
            } else if(this.value == '') {
//                objt.created = false;
//                objt.add.remove();
            }
            if(objt.nextBlockCreated) {
//                objt.nextBlock.changeHead(this.value);
            }
        });
        this.inp.addEventListener("keydown", function(e) {
            if(e.key == 'Enter' && !objt.nextBlockCreated) {
//                objt.nextBlock = addAntwortBlock();
//                objt.nextBlock.changeHead(this.value);
//                objt.nextBlockCreated = true;
//                objt.created = false;
//                objt.add.remove();
            }
        });
    }

    
}