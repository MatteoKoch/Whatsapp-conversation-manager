<?php
include "secret.php";
$url = "https://graph.facebook.com/v15.0/$wa_id/message_templates?access_token=$at_24";
$jsonfetch = file_get_contents($url);

$templates = json_decode($jsonfetch, true);

$sprachen = array();
$sprachen_keys = array();
foreach($templates["data"] as $val) {
    if(!in_array($val["language"], $sprachen)) {
        array_push($sprachen, $val["language"]);
    }
}

?>

<!DOCTYPE html>
<html>
    
    <head>
        <title>Templates</title>
        <?php include "head.php"; ?>
        <script>
            let json_temps = `<?= $jsonfetch  ?>`;     
        </script>
    </head>
    
    <body>
        <form method="post" action="buildrequest.php" class="main">
            
            <div>
                <h2>Sprache</h2>
                <select name="templates" id="sprache">
                    <?php
                        foreach($sprachen as $val) {
                            echo "<option value='$val'>$val</option>\n";
                        }
                    ?>
                </select>
            </div>
            
            <div>
                <h2>Templates</h2>
                <select name="templates" id="vorlage">
                    <?php
                        foreach($templates["data"] as $val) {
                            if($val["language"] == $sprachen[0]) {
                                $template = $val["name"];
                                $language = $val["language"];
                                echo "<option value='$template.$language'>$template</option>\n";
                            }
                        }
                    ?>
                </select>
            </div>
            
            <div>
                <h2>Senden</h2>
                <input type="hidden" name="templatecode" id="templatecode">
                <input type="submit" name="submit" value="SENDEN">
            </div>
        </form>
        
        <pre class="code">
            <h2>JSON - VORLAGE</h2>
            <code id="code">
            </code>
        </pre>
        
        <script defer>
            let temps = JSON.parse(json_temps.replaceAll("\n", "\\n"));
            
            function findTemplate(key, formatted) {
                let infos = key.split(".");
                for(let i = 0; i < temps.data.length; ++i) {
                    if(temps.data[i].name == infos[0] && temps.data[i].language == infos[1]) return formatted?JSON.stringify(temps.data[i], null, 3):JSON.stringify(temps.data[i]);
                }
                return null;
            }
            
            let lang = [];
            <?php
                foreach($sprachen as $val) {
                    echo "lang['$val'] = [];\n";
                    foreach($templates["data"] as $lang) {
                        if($lang["language"] == $val) {
                            $name = $lang["name"];
                            $s = '<option value="'.$name.'.'.$val.'">'.$name.'</option>';
                            echo "lang['$val'].push('$s');\n";
                        }
                    }                    
                }
            ?>
            
            let sprachSelect = document.getElementById("sprache");
            let vorlagenSelect = document.getElementById("vorlage");
            
            document.getElementById("code").innerHTML = findTemplate(vorlagenSelect.selectedOptions[0].value, true);
            document.getElementById("templatecode").value = findTemplate(vorlagenSelect.selectedOptions[0].value, false);
            
            sprachSelect.addEventListener("change", function(e) {
                vorlagenSelect.innerHTML = '';
                lang[this.selectedOptions[0].innerHTML].forEach(item => vorlagenSelect.innerHTML+=item);
                document.getElementById("code").innerHTML = findTemplate(vorlagenSelect.selectedOptions[0].value, true);
                document.getElementById("templatecode").value = findTemplate(vorlagenSelect.selectedOptions[0].value, false);
            });
            
            vorlagenSelect.addEventListener("change", function(e) {
                document.getElementById("code").innerHTML = findTemplate(this.selectedOptions[0].value, true);
                document.getElementById("templatecode").value = findTemplate(vorlagenSelect.selectedOptions[0].value, false);
            });
        </script>
    </body>
    
</html>