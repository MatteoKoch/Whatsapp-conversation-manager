<?php
include "secret.php";
include "db_conn.php";
$url = "https://graph.facebook.com/v15.0/$wa_id/message_templates?access_token=$at_24";
$jsonfetch = file_get_contents($url);

$templates = json_decode($jsonfetch, true);

?>

<!DOCTYPE html>
<html>
    
    <?php if(isset($_COOKIE['passwort']) && $_COOKIE['passwort'] == "DeiMamsel") { ?>
    
        <head>
            <title>Flow erschaffen</title>
            <?php include "head.php"; ?>
            <link href="style/flow.css" rel="stylesheet" type="text/css">
            <script src="libs/DivDraw/divdraw.js"></script>
            <script src="AntwortBlock.js"></script>
            <script src="ClientBlock.js"></script>
            <script>
                let templates = <?= $jsonfetch ?>;
                let temps = [];
                <?php
                    foreach($templates['data'] as $val) {
                        $name = $val['name'];
                        $lang = $val['language'];
                        echo "temps.push({'name': '$name', 'language': '$lang'});\n";
                    }
                ?>
            </script>
            <script src="template_deconstruct.js"></script>

        </head>

        <body>

            <div id="myChart"></div>

            <div class="mat-button" id="send" title="Flow speichern">Flow speichern</div>

            <script>

                let width = window.innerWidth;
                let height = window.innerHeight;

                var elem = document.getElementById("myChart");
                var canvas = new DivDraw(elem, width, height);

                window.addEventListener("resize", function(e) {
                    canvas.setSize(window.innerWidth, window.innerHeight);
                });

            </script>

            <script>

                let blocks = []
                let layer = 0;

                blocks[layer] = [];
                initBlocks(1000);
                
                let layers = [];
                layers[layer] = 0;

                blocks[layer].push(new ClientBlock(250*layer+20, 250*layers[layer], 200, 200, {"index": layer, "index0": layers[layer]}));
                layers[layer]++;
                
                let currentAddBlock;
                
                addAddBlock();                
                
                function addAddBlock() {
                    if(layers[layer] > 1) currentAddBlock.remove();
                    let height = 50;
                    let width = 50;
                    let add = canvas.rect(250*(layer+1)+20, ((200*layers[layer]+50*(layers[layer]-1))-height)/2, width, height, '#ccc');
                    add.classList.add("add-flow");
                    add.addEventListener("click", function(e) {
                        this.remove();
                        addAntwortBlock();
                    });
                    currentAddBlock = add;
                }

                function addAntwortBlock(samelayer = false) {
                    if(layers[++layer] == NaN || layers[layer] == null) {
                        layers[layer] = 0;
                    }
                    let nBlock = new AntwortBlock(250*layer+20, ((200*layers[layer-1]+50*(layers[layer-1]-1))-200)/2, 200, 200, {"index": layer, "index0": layers[layer]});
                    addTemplateDesconstruct(nBlock);
                    layers[layer]++;
                    blocks[layer].push(nBlock);
                    let oBlock;
                    for(let i = 0; i < layers[layer-1]; ++i) {
                        oBlock = blocks[layer-1][i];
                        canvas.line(oBlock.x + oBlock.w,
                                oBlock.y + oBlock.h/2,
                                nBlock.x,
                                nBlock.y + nBlock.h/2,
                                /*'linear-gradient(90deg, red, #333333)'*/'#000',
                                2);
                    }
                    return nBlock;
                }

                function addClientBlock(samelayer = false) {
                    if(!samelayer) {
                        if(layers[++layer] == NaN || layers[layer] == null) {
                            layers[layer] = 0;
                        }
                    }
                    let nBlock = new ClientBlock(250*layer+20, 250*layers[layer], 200, 200, {"index": layer, "index0": layers[layer]});
                    layers[layer]++;
                    blocks[layer].push(nBlock);
                    if(layer > 0) {
                        let oBlock = blocks[layer-1][0];
                        canvas.line(oBlock.x + oBlock.w,
                                oBlock.y + oBlock.h/2,
                                nBlock.x,
                                nBlock.y + nBlock.h/2,
                                /*'linear-gradient(90deg, #333333, red)'*/'#000',
                                2);
                    }
                    addAddBlock();
                    return nBlock;
                }                
                
                function initBlocks(blocksSize) {
                    for(let i = 0; i < blocksSize; ++i) blocks[i] = [];
                }

            </script>

            <script defer>

                function sendData(data) {
                  let xhr = new XMLHttpRequest();
                  xhr.open('POST', '<?= $url_of_your_db_insert ?>', true);
                  xhr.onload = function () {
                    if(xhr.responseText == "Fehler") {
                    }
                  };
                  xhr.send(data);
                }

                var sendbtn = document.getElementById("send");

                sendbtn.addEventListener("click", function(e) {
                    let data = new FormData();
                    document.querySelectorAll("input[name*='client'], input[name*='antwort']").forEach(item => {
                        data.append(item.name, item.value);
                    });
                    data.append("access_token", "DeiMamsel");
                    sendData(data);
                });

            </script>
            
            <script>
                function showBlockData() {
                    blocks.forEach(item => {
                        if(item.length > 0) item.forEach(block => {
                            console.log(block.index.index, block.type, block.index.index0, block.data, block.dataraw)
                        });
                    });
                }
            </script>


        </body>
    
    <?php } ?>
    
</html>
