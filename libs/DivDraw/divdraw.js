class DivDraw {
    
    constructor(el, w = 300, h = 300, col = '#f1f1f1') {
        this.elem = el;
        this.width = w;
        this.height = h;
        this.back = col;
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
    
    setSize(w = this.width, h = this.height, type) {
        this.elem.style.width = `${w}px`;
        this.elem.style.height = `${h}px`;
        this.elem.setAttribute("width", w);
        this.elem.setAttribute("height", h);
    }
    
    setBackground(col = this.back) {
        this.elem.style.background = col;
    }
    
    rect(x, y, w = 1, h = 1, col = 'red', hoverid = false, ret = false) {
        var pixel = document.createElement("div");
        pixel.style.position = 'absolute';
        pixel.style.left = `${x}px`;
        pixel.style.top = `${y}px`;
        pixel.style.width = `${w}px`;
        pixel.style.height = `${h}px`;    
        pixel.style.background = col;
        if(hoverid) {
            pixel.style.zIndex = '9';
            pixel.style.cursor = 'pointer';
            pixel.addEventListener("mouseover", function(e) {
                var lab = document.getElementById(hoverid);
                lab.style.opacity = '1';
                lab.style.visibility = 'visible';
                pixel.style.outline = `1px solid ${col}`;
                pixel.style.outlineOffset = '3px';
            });
            pixel.addEventListener("mouseleave", function(e) {
                var lab = document.getElementById(hoverid);
                lab.style.opacity = '0';
                lab.style.visibility = 'hidden';
                pixel.style.outline = 'none';
            });
        }
        if(ret) {
            return pixel;
        } else {
            this.elem.appendChild(pixel);
            return pixel;
        }
    }
    
 
    
    ellipse(x, y, w, h, col = 'red', hoverid = false, ret = false) {
        var kreis = document.createElement("div");
        kreis.style.position = 'absolute';
        kreis.style.left = `${x-(w/2)}px`;
        kreis.style.top = `${y-(h/2)}px`;
        kreis.style.width = `${w}px`;
        kreis.style.height = `${h}px`;
        kreis.style.background = col;
        kreis.style.zIndex = '9';
        kreis.style.borderRadius = '50%';
        if(hoverid) {
            kreis.style.cursor = 'pointer';
            kreis.addEventListener("mouseover", function(e) {
                var lab = document.getElementById(hoverid);
                lab.style.opacity = '1';
                lab.style.visibility = 'visible';
                kreis.style.outline = `1px solid ${col}`;
                kreis.style.outlineOffset = '3px';
            });
            kreis.addEventListener("mouseleave", function(e) {
                var lab = document.getElementById(hoverid);
                lab.style.opacity = '0';
                lab.style.visibility = 'hidden';
                kreis.style.outline = 'none';
            });
        }
        if(ret) {
            return kreis;
        } else {
            this.elem.appendChild(kreis);
            return kreis;
        }
    }
    
    line(x1, y1, x2, y2, col = 'red', stroke = 1, ret = false) {
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
        if(ret) {
            return line;
        } else {
            this.elem.appendChild(line);
            return line;
        }
    }
    
    triangle(x, y, w, h, r, col = 'red', ret = false) {
        var drei = document.createElement("div");
        drei.style.position = 'absolute';
        if(r == 1) drei.style.borderLeft = `${w}px solid transparent`;
        else if(r == -1) drei.style.borderRight = `${w}px solid transparent`;
        drei.style.borderBottom = `${h}px solid ${col}`;
        drei.style.width = '0';
        drei.style.left = `${x}px`;
        drei.style.top = `${y-h}px`;
        if(ret) {
            return drei;
        } else {
            this.elem.appendChild(drei);
            return drei;
        }
    }
    
    label(x, y, head, data, datalabel = '', id, col = 'red', ret = false) {
        var label = document.createElement("div");
        label.style.position = 'absolute';
        let tx = x;
        label.style.top = `${y}px`;
        label.style.background = 'rgba(0,0,0,01)';
        label.style.padding = '5px 10px';
        label.style.borderRadius = '6px';
        label.style.minWidth = '50px';
        label.style.zIndex = '10';
        label.style.opacity = '0';
        label.style.visibility = 'hidden';
        var arrow = document.createElement("div");
        arrow.style.position = 'absolute';
        arrow.style.width = '12px';
        arrow.style.height = '12px';
        arrow.style.top = '13px';
        arrow.style.transform = 'rotate(45deg)';
        arrow.style.background = 'rgba(0,0,0,1)';
        var title = document.createElement("h4");
        if(datalabel == '') title.innerHTML = head;
        else title.innerHTML = datalabel;
        title.style.margin = '0';
		title.style.color = '#fff';
        var dat = document.createElement("span");
        dat.innerHTML = data;
		dat.style.color = '#fff';
        var legend = document.createElement("span");
        legend.style.display = 'inline-block';
        legend.style.marginRight = '6px';
        legend.style.width = '10px';
        legend.style.height = '10px';
        legend.style.border = '1px solid #fff';
        legend.style.backgroundColor = col;
        label.appendChild(arrow);
        label.appendChild(title);
        label.appendChild(legend);
        label.appendChild(dat);
        label.setAttribute("id", id);
        this.elem.appendChild(label);
        if(x+label.offsetWidth > this.width) tx-=(label.offsetWidth+28);
        label.style.left = `${tx}px`;
        if(x+label.offsetWidth > this.width) arrow.style.right = '-6px';
        else arrow.style.left = '-6px';
    }
    
    text(x, y, t, breit = 'fit-content', size = 16, col = '#000', bold = false, ret = false) {
        var satz = document.createElement("h3");
        satz.innerHTML = t;
        satz.style.position = 'absolute';
        satz.style.margin = '0';
        satz.style.width = `${breit}px`;
        if(breit != 'fit-content') satz.style.textAlign = 'center';
        satz.style.left = `${x}px`;
        satz.style.top = `${y}px`;
        satz.style.fontSize = `${size}px`;
        satz.style.color = col;
        if(bold) satz.style.fontWeight = `${bold}`;
        if(ret) {
            return satz;
        } else {
            this.elem.appendChild(satz);
            return satz;
        }
    }
    
    clear() {
        this.elem.innerHTML = '';
    }
    
    legend(x, y, t, col, size = 16, ret = false, graphs, index, obj) {
        var legende = document.createElement("div");
        legende.style.cursor = 'pointer';
        var legrect = this.rect(x, y, 20, 14, col, false, true);
        var txt = this.text(x+25, y, t, 'fit-content', 12, '#000', false, true);
        let str = graphs[index];
        if(str.includes('dontDraw')) txt.style.textDecoration = 'line-through';
        legende.appendChild(legrect);
        legende.appendChild(txt);
        legende.addEventListener("click", function(e) {
            obj.clear();
            let str = graphs[index];
            if(str.includes('dontDraw')) {
                graphs[index] = str.replace(', "dontDraw": true}', '}');
            } else {
                graphs[index] = str.replace('}', ', "dontDraw": true}');
            }
            obj.graph(graphs[0]!=null?graphs[0]:null, 
                       graphs[1]!=null?graphs[1]:null,
                       graphs[2]!=null?graphs[2]:null,
                       graphs[3]!=null?graphs[3]:null,
                       graphs[4]!=null?graphs[4]:null,
                       graphs[5]!=null?graphs[5]:null,
                       graphs[6]!=null?graphs[6]:null);
        });
        this.elem.appendChild(legende);
    }
    
    graph() {
        
        if(arguments.length > 7) console.log("Graph(p1, p2,...,p7) cannot have more than 7 Input Parameters!");
        else {
        
            let start = 30;

            let breite, teiler;
            let graphheight = this.height - 30;

            let arglen = 0;
            for(let k = 0; k < arguments.length; ++k) if(arguments[k] != null) ++arglen;
            
            let maxelem = 0;
            for(let k = 0; k < arguments.length; ++k) {
                if(arguments[k] != null) {
                    let grap = JSON.parse(arguments[k]);
                    if(Math.max.apply(null, grap.data) > maxelem) maxelem = Math.max.apply(null, grap.data);

                    breite = (this.width-start) / grap.data.length;

                    teiler = Math.round(60*grap.data.length/(this.width-breite));

                    this.legend(k*this.width/arglen +start+10, 3, grap.label, grap.color, 12, false, arguments, k, this);
                }
            }

            maxelem = parseInt(maxelem * 1.15);
            while(++maxelem%4 != 0);
            
            let anzmax = (this.height*1.3) / 100;

            let anzahlschritte = parseInt(maxelem>=anzmax? anzmax:maxelem)>10? 10:parseInt(maxelem>=anzmax? anzmax:maxelem);

            //y-axis
            this.line(start, 0, start, graphheight, '#000', 2);
            //x-axis
            this.line(start, graphheight, this.width, graphheight, '#000', 2);

            let ylabel;
            for(let i = 0; i < anzahlschritte; ++i) {
                //long lines parallel to the x-axis
                this.line(start, i*graphheight/anzahlschritte, this.width, i*graphheight/anzahlschritte, '#bbb', 1);
                //marks on the y-axis
                this.line(start-3, i*graphheight/anzahlschritte, start+3, i*graphheight/anzahlschritte, '#000', 2);
                //labels for the y-axis
                ylabel = maxelem - (i*maxelem/anzahlschritte);
                this.text(start-30, i*graphheight/anzahlschritte-3, Number.isInteger(ylabel)?parseInt(ylabel):ylabel.toFixed(1), 'fit-content', 13, '#555', 900);
            }

            for(let k = 0; k < arguments.length; ++k) {
                
                if(arguments[k] != null) {
                
                    let graphic = JSON.parse(arguments[k]);

                    if(graphic.type == 'bar' && graphic.dontDraw == null) {

                        let x, y, xn, yn;

                        for(let i = 0; i < graphic.data.length; ++i) {                             
                            x = Math.round(i*breite +start);
                            y = Math.round(graphheight-(graphic.data[i]*graphheight/maxelem));
                            xn = Math.round((i+1)*breite +start);
                            yn = Math.round(graphheight-(graphic.data[i+1]*graphheight/maxelem));
                            //drawing the bars
                            this.rect(x, y, breite*0.85, graphheight-y, graphic.color, `${graphic.label}${k}${i}`);
                            this.label(x+(breite/2), y-20, graphic.labels[i], graphic.label+': '+graphic.data[i], graphic.dataLabels!=null?graphic.dataLabels[i]:graphic.labels[i],`${graphic.label}${k}${i}`, graphic.color);
                            if(i % teiler == 0) {
                                //labels for the x-axis
                                this.text(x, graphheight+3, graphic.labels[i], 'fit-content', 12, '#555');
                            }     
                        }

                    } else if(graphic.type = 'line' && graphic.dontDraw == null) {

                        let x, y, xn, yn;

                        for(let i = 0; i < graphic.data.length; ++i) {
                            x = Math.round(i*breite +start);
                            y = Math.round(graphheight-(graphic.data[i]*graphheight/maxelem));
                            xn = Math.round((i+1)*breite +start);
                            yn = Math.round(graphheight-(graphic.data[i+1]*graphheight/maxelem));
                            if(i+2 <= graphic.data.length) {
                                //drawing the lines between points
                                this.line(x, y, xn, yn, graphic.lineColor, graphic.lineStroke);
                                //Fill area under curve
                                if(graphic.fill != null) {
                                    if(y > yn) {
                                        this.rect(x, y, xn-x, graphheight-y, graphic.fill);
                                        this.triangle(x, y, xn-x, y-yn, 1, graphic.fill);                            
                                    } else if (yn > y) {
                                        this.rect(x, yn, xn-x, graphheight-yn, graphic.fill);
                                        this.triangle(x, yn, xn-x, yn-y, -1, graphic.fill);
                                    } else if(yn == y) {
                                        this.rect(x, yn, xn-x, graphheight-yn, graphic.fill);
                                    }

                                }
                            }
                            //drawing the points
                            this.ellipse(x, y, graphic.stroke, graphic.stroke, graphic.color, `${k}${i}`);
                            this.label(x+12, y-20, graphic.labels[i], graphic.label+': '+graphic.data[i], graphic.dataLabels!=null?graphic.dataLabels[i]:graphic.labels[i],`${k}${i}`, graphic.color);
                            if(i % teiler == 0) {
                                //labels for the x-axis
                                this.text(x, graphheight+3, graphic.labels[i], 'fit-content', 12, '#555');
                            }
                        }

                    }
                }
            }
        }
    }
    
}
