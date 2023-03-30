<!DOCTYPE html>
<html>
    
    <head>
        <title>Template vorbereiten</title>
        <?php include "head.php"; ?>
    </head>
    
    <body>


<?php
$comptext = array();
        
function countOccur($st, $search) {
    $count = 0;
    for($i = 0; $i < strlen($st)-strlen($search); $i++) {
        $searchcount = 0;
        for($s = 0; $s < strlen($search); $s++) {
            if($st[$i+$s] == $search[$s]) {
                $searchcount++;
            }
        }
        if($searchcount == strlen($search)) $count++;
    }
    return $count;
}

function createHeader($component) {
    global $comptext;
    $comptext['header'] = array();
    if(in_array("text", array_keys($component))) {
        $comptext['header']['text'] = array();
        if(countOccur($component['text'], "{{") > 0) {
            $comptext['header']['text'][0] = $component['text'];
            $header = array(
                "type" => "header",
                "parameters" => array(
                    array(
                        "type" => "text",
                        "text" => "HEADER.TODO.TEXT" //TODO: handle Text variables (Note: Bei Title nur 1 Variable möglich!)
                    )
                )
            );
        } else $header = null;       
    } else if(in_array("format", array_keys($component))) {
        if($component['format'] == "IMAGE") {
            $header = array(
                "type" => "header",
                "parameters" => array(
                    array(
                        "type" => "image",
                        "image" => array(
                            "link" => "HEADER.TODO.IMAGE" //TODO: handle Input (Note: URL: Bild (JPG, PNG))
                        )
                    )
                )
            );
        } else if($component['format'] == "VIDEO") {
            $header = array(
                "type" => "header",
                "parameters" => array(
                    array(
                        "type" => "video",
                        "video" => array(
                            "link" => "HEADER.TODO.VIDEO" //TODO: handle Input (Note: URL: Video (MP4))
                        )
                    )
                )
            );
        } else if($component['format'] == "DOCUMENT") {
            $header = array(
                "type" => "header",
                "parameters" => array(
                    array(
                        "type" => "document",
                        "document" => array(
                            "link" => "HEADER.TODO.DOCUMENT", //TODO: handle Input (Note: URL: Dokument (PDF))
                            "filename" => "HEADER.TODO.FILENAME"
                        )
                    )
                )
            );
        }
    } else $header = null;
    return $header;
}
            
function createBody($component) {
    global $comptext;
    $comptext['body'] = array();
    if(in_array("text", array_keys($component))) {
        $comptext['body']['text'] = array();
        if(countOccur($component['text'], "{{") > 0) {
            $params = array();
            $comptext['body']['text'][0] = $component['text'];
            for($i = 0; $i < countOccur($component['text'], "{{"); $i++) {                
                array_push($params, array(
                    "type" => "text", //TODO: vorerst nur Text, später auch: date_time, currency... wird erst zur Sendezeit festgelegt
                    "text" => "BODY.TODO.TEXT"//TODO: handle Text variables
                ));
            }
            $body = array(
                "type" => "body",
                "parameters" => $params
            );
        } else $body = null;
    } else $body = null;
    return $body;
}
            
function createFooter($component) {
    $footer = null; //Für zukünftige Änderungen
    return $footer;
}
            
function createButtons($component) {
    global $comptext;
    $comptext['buttons'] = array();
    if(in_array("buttons", array_keys($component))) {
        $button = array();
        $qi_index = 0;
        $comptext['buttons']["quick_reply"] = array();
        $i = 0;
        foreach($component['buttons'] as $btn) {
            if($btn['type'] == "QUICK_REPLY") {
                $comptext['buttons']['quick_reply'][$i] = $btn['text'];
                array_push($button, array(
                    "type" => "button",
                    "sub_type" => "quick_reply",
                    "index" => $qi_index,
                    "parameters" => array(
                        array(
                            "type" => "payload",
                            "payload" => "BUTTON.TODO.PAYLOAD"//TODO: Payload erzeugen und in DB hinterlegen, um Später Antwort zu prüfen und auf Antwort reagieren zu können
                        )
                    )
                ));
                $qi_index++;
            }
            $i++;
        }
    } else $button = null;
    return $button;
}

function createComponent($component) {
    switch($component['type']) {
        case "HEADER":
            return createHeader($component);
            break;
            
        case "BODY":
            return createBody($component);
            break;
            
        case "FOOTER":
            return createFooter($component);
            break;
            
        case "BUTTONS":
            return createButtons($component);
            break;
    }
}
        
function createInputs($inputs) {
    include "db_conn.php";
    
    global $comptext;
    
    $replacer = array();
    
    echo "<form action='sendtemplate.php' method='post' style='display: flex; flex-direction: column; gap: 30px; max-width: 500px; margin: 0 auto;'>\n";
    
    //HEADER
    if(countOccur($inputs, "HEADER.TODO") > 0) {
        echo "<div>\n";
        echo '<h1>HEADER: '.countOccur($inputs, "HEADER.TODO").'</h1>';
        //Text
        $text = $comptext['header']['text'][0];
        echo "<h2>$text</h2>\n";
        for($j = 0; $j < countOccur($inputs, "HEADER.TODO.TEXT"); $j++) {
            $jpo = $j+1;
            array_push($replacer, "HEADER.TODO.TEXT");
            echo "<h3>Text {{{$jpo}}}</h3>\n";
            echo "<input type='text' name='HEADER.TODO.TEXT[]' required>\n";
        }
        //Image
        for($j = 0; $j < countOccur($inputs, "HEADER.TODO.IMAGE"); $j++) {
            array_push($replacer, "HEADER.TODO.IMAGE");
            echo "<h3>Bild-URL</h3>\n";
            echo "<input type='text' name='HEADER.TODO.IMAGE[]' required>\n";
        }
        //Video
        for($j = 0; $j < countOccur($inputs, "HEADER.TODO.VIDEO"); $j++) {
            array_push($replacer, "HEADER.TODO.VIDEO");
            echo "<h3>Video-URL</h3>\n";
            echo "<input type='text' name='HEADER.TODO.VIDEO[]' required>\n";
        }
        //File
        for($j = 0; $j < countOccur($inputs, "HEADER.TODO.DOCUMENT"); $j++) {
            array_push($replacer, "HEADER.TODO.DOCUMENT");
            array_push($replacer, "HEADER.TODO.FILENAME");
            echo "<h3>Dokument-URL</h3>\n";
            echo "<input type='text' name='HEADER.TODO.DOCUMENT[]' required>\n";
            echo "<h3>Dokument-Name</h3>\n";
            echo "<input type='text' name='HEADER.TODO.FILENAME[]' required>\n";
        }
        echo "</div>\n";
    }
    
    //BODY
    if(countOccur($inputs, "BODY.TODO") > 0) {
        echo "<div>\n";
        echo '<h1>BODY: '.countOccur($inputs, "BODY.TODO").'</h1>';
        //Text
        $text = $comptext['body']['text'][0];
        echo "<h2>$text</h2>\n";
        for($j = 0; $j < countOccur($inputs, "BODY.TODO.TEXT"); $j++) {
            array_push($replacer, "BODY.TODO.TEXT");
            $jpo = $j+1;
            echo "<h3>Text {{{$jpo}}</h3>\n";
            echo "<input type='text' name='BODY.TODO.TEXT[]' required>\n";
        }
        echo "</div>\n";
    }
    
    //FOOTER
    if(countOccur($inputs, "FOOTER.TODO") > 0) {
        echo "<div>\n";
        echo '<h1>FOOTER: '.countOccur($inputs, "FOOTER.TODO").'</h1>';
        echo "</div>\n";
    }
        
    //BUTTONS
    if(countOccur($inputs, "BUTTON.TODO") > 0) {
        echo "<div>\n";
        echo '<h1>BUTTON: '.countOccur($inputs, "BUTTON.TODO").'</h1>';
        for($j = 0; $j < countOccur($inputs, "BUTTON.TODO.PAYLOAD"); $j++) {
            //Text
            $text = $comptext['buttons']['quick_reply'][$j];
            array_push($replacer, "BUTTON.TODO.PAYLOAD");
            echo "<h2>$text</h2>\n";
            echo "<h3>Payload</h3>\n";
            echo "<input type='text' name='BUTTON.TODO.PAYLOAD[]' required>\n";
        }
        echo "</div>\n";
    }
    
    $sql = "SELECT event FROM stefan WHERE event LIKE '%wa_id%name%body%' ORDER BY id DESC";
    $res = mysqli_query($conn, $sql);
    $nummern = array();
    if(mysqli_num_rows($res) > 0) {
        while($jsonevent = mysqli_fetch_assoc($res)) {
            $phpevent = json_decode($jsonevent['event'], true);
            if(!in_array($phpevent['entry'][0]['changes'][0]['value']['contacts'][0]['wa_id'], $nummern)) {
                array_push($nummern, $phpevent['entry'][0]['changes'][0]['value']['contacts'][0]['wa_id']);
            }
        }
    }
    echo "<h1>Senden an</h1>\n";
    echo "<select name='nummer'>\n";
        foreach($nummern as $nummer) {
            echo "<option value='$nummer'>+$nummer</option>\n";
        }
    echo "</select>\n";
    
    echo "<input type='hidden' name='template' value='$inputs'>\n";
    foreach($replacer as $rep) {
        echo "<input type='hidden' name='rep[]' value='$rep'>\n";
    }
    
    echo "<input type='submit' name='submit' value='SENDEN'>\n";
    
    echo "</form>\n";
}

if(isset($_POST['templatecode']) && isset($_POST['templates'])) {
    $base = $_POST['templatecode'];
    
    $info = explode(".", $_POST['templates']);
    $name = $info[0];
    $lang = $info[1];
    
    $comps = array();
    $base = json_decode($base, true);
    foreach($base['components'] as $val) {
        $comp = createComponent($val);
        if($val['type'] == "BUTTONS") {
            foreach($comp as $btn) {
                array_push($comps, $btn);
            }
        } else if($comp != null) array_push($comps, $comp);
    }

    $data = array(
        "messaging_product" => "whatsapp",
        "to" => "TEMPLATE.TODO.NUMMER",
        "type" => "template",
        "template" => array(
            "name" => $name,
            "language" => array(
                "code" => $lang
            ),
            "components" => $comps
        )
    );

    createInputs(json_encode($data));
    
}
?>       
    </body>
    
</html>