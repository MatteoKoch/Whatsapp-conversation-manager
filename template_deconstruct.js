var comptext = [];

function countOccur(st, search) {
    count = 0;
    for(i = 0; i < st.length-search.length; i++) {
        searchcount = 0;
        for(s = 0; s < search.length; s++) {
            if(st[i+s] == search[s]) {
                searchcount++;
            }
        }
        if(searchcount == search.length) count++;
    }
    return count;
}

function convert(str) {
    let newstr = "<span>";
    for(i = 0; i < str.length; i++) {
        if(str[i] == "\n") {
            newstr += "</span><span>";
        } else {
            newstr += str[i];
        }
    }
    newstr += "</span>";
    return newstr;
}

function addTemplateDesconstruct(elem) {
    elem.select.onchange = function(e) {
        elem.dataraw = templates.data[this.selectedIndex];
        createInputs(elem.data = deconstruct(templates.data[this.selectedIndex], this.value), elem.form);
    }
}

function deconstruct(template, selectVal) {
    comptext = [];
    let comps = [];
    let comp;
    template.components.forEach(item => {
        comp = createComponent(item);
        if(item.type == "BUTTONS") {
            comp.forEach(btn => {
                comps.push(btn);
            });
        } else if(comp != null) comps.push(comp);
    });
    data = {
        messaging_product: "whatsapp",
        to: "TEMPLATE.TODO.NUMMER",
        type: "template",
        template: {
            name: selectVal.split(".")[0],
            language: {
                code: selectVal.split(".")[1]
            },
            components: comps
        }
    };
    return data;
}

function createComponent(component) {
    switch(component.type) {
        case "HEADER":
            return createHeader(component);
            break;
            
        case "BODY":
            return createBody(component);
            break;
            
        case "FOOTER":
            return createFooter(component);
            break;
            
        case "BUTTONS":
            return createButtons(component);
            break;
    }
}

function createHeader(component) {
    comptext.header = [];
    let header = [];
    if(Object.keys(component).includes("text")) {
        comptext.header.text = [];
        if(countOccur(component.text, "{{") > 0) {
            comptext.header.text[0] = component.text;
            header = {
                type: "header",
                parameters: [
                    {
                        type: "text",
                        text: "TODO.HEADER.TEXT"
                    }
                ]
            };
        } else header = null;       
    } else if(Object.keys(component).includes("format")) {
        if(component.format == "IMAGE") {
            header = {
                type: "header",
                parameters: [
                    {
                        type: "image",
                        image: {
                            link: "TODO.HEADER.IMAGE"
                        }
                    }
                ]
            }
        } else if(component.format == "VIDEO") {
            header = {
                type: "header",
                parameters: [
                    {
                        type: "video",
                        video: {
                            link: "TODO.HEADER.VIDEO"
                        }
                    }
                ]
            }
        } else if(component.format == "DOCUMENT") {
            header = {
                type: "header",
                parameters: [
                    {
                        type: "document",
                        document: {
                            link: "TODO.HEADER.DOCUMENT",
                            filename: "TODO.HEADER.FILENAME"
                        }
                    }
                ]
            }
        }
    } else header = null;
    return header;
}

function createBody(component) {
    comptext.body = [];
    let body = [];
    if(Object.keys(component).includes("text")) {
        comptext.body.text = [];
        if(countOccur(component.text, "{{") > 0) {
            let params = [];
            comptext.body.text[0] = component.text;
            for(i = 0; i < countOccur(component.text, "{{"); i++) {                
                params.push({
                    type: "text",
                    text: "TODO.BODY.TEXT"
                });
            }
            body = {
                type: "body",
                parameters: params
            }
        } else body = null;
    } else body = null;
    return body;
}

function createFooter(component) {
    let footer = null; //Für zukünftige Änderungen
    return footer;
}

function createButtons(component) {
    comptext.buttons = [];
    let button = [];
    if(Object.keys(component).includes("buttons")) {
        let qi_index = 0;
        comptext.buttons.quick_reply = [];
        i = 0;
        component.buttons.forEach(btn => {
            if(btn.type == "QUICK_REPLY") {
                comptext.buttons.quick_reply[i] = btn.text;
                button.push({
                    type: "button",
                    sub_type: "quick_reply",
                    index: qi_index,
                    parameters: [
                        {
                            type: "payload",
                            payload: "TODO.BUTTON.PAYLOAD"
                        }
                    ]
                });
                qi_index++;
            }
            i++;
        });
    } else button = null;
    return button;
}

function createInputs(data, form) {
    
    form.innerHTML = '';
    
    let inputs = JSON.stringify(data);
    
    if(countOccur(inputs, "TODO.HEADER") > 0) {                
        for(let i = 0; i < countOccur(inputs, "TODO.HEADER.TEXT"); i++) {
            let headline = document.createElement("div");
            headline.style.display = "grid";
            headline.innerHTML = convert(comptext.header.text[0]);
            form.appendChild(headline);
            let text = document.createElement("input");
            text.type = "text";
            text.classList = "header-text";
            text.placeholder = "{{1}}";
            form.appendChild(text);
        }
        for(let i = 0; i < countOccur(inputs, "TODO.HEADER.IMAGE"); i++) {
            let image = document.createElement("input");
            image.type = "text";
            image.classList = "header-image";
            image.placeholder = "Bild-url";
            form.appendChild(image);
        }
        for(let i = 0; i < countOccur(inputs, "TODO.HEADER.VIDEO"); i++) {
            let video = document.createElement("input");
            video.type = "text";
            video.classList = "header-video";
            video.placeholder = "Video-url";
            form.appendChild(video);
        }
        for(let i = 0; i < countOccur(inputs, "TODO.HEADER.DOCUMENT"); i++) {
            let doc = document.createElement("input");
            doc.type = "text";
            doc.classList = "header-document";
            doc.placeholder = "Dokument-url";
            let docname = document.createElement("input");
            docname.type = "text";
            docname.classList = "header-documentname";
            docname.placeholder = "Dokumentenname";
            form.appendChild(doc);
            form.appendChild(docname);
        }
    }
    
    if(countOccur(inputs, "TODO.BODY") > 0) {
        let headline = document.createElement("div");
        headline.innerHTML = convert(comptext.body.text[0]);
        headline.style.display = "grid";
        form.appendChild(headline);
        
        for(let i = 0; i < countOccur(comptext.body.text[0], "{{"); i++) {
            let text = document.createElement("input");
            text.type = "text";
            text.classList = "body-text";
            text.placeholder = `{{${i+1}}}`;
            form.appendChild(text);
        }
    }
    
    if(countOccur(inputs, "TODO.FOOTER") > 0) {
        let headline = document.createElement("span");
        headline.innerHTML = comptext.footer.text[0];
        form.appendChild(headline);
    }
    
    if(countOccur(inputs, "TODO.BUTTON") > 0) {                
        for(let i = 0; i < countOccur(inputs, "TODO.BUTTON.PAYLOAD"); i++) {
            let headline = document.createElement("span");
            headline.innerHTML = comptext.buttons.quick_reply[i];
            form.appendChild(headline);
            let button = document.createElement("input");
            button.type = "text";
            button.classList = "button";
            button.placeholder = "Payload";
            form.appendChild(button);
        }
    }

}