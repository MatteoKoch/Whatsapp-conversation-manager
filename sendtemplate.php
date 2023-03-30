<?php

function replace_first($st, $search, $replace) {
    $pos = strpos($st, $search);
    if ($pos !== false) {
        $newstring = substr_replace($st, $replace, $pos, strlen($search));
    }
    return $newstring;
}

function send($data) {
    include "secret.php";
    $url = "https://graph.facebook.com/v15.0/$te_id/messages";
    $options = array(
        'http' => array(
            'method' => "POST",
            'header' => "Content-Type: application/json\r\n" .
                        "Authorization: Bearer $at_24\r\n",
            'content' => http_build_query($data)
        )
    );
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
}

if(isset($_POST['template']) && isset($_POST['rep']) && isset($_POST['nummer'])) {
    $json = $_POST['template'];
    $nummer = $_POST['nummer'];
    $json = replace_first($json, "TEMPLATE.TODO.NUMMER", $nummer);
    echo "<h1>$var</h1>\n";
    $lasrep = '';
    foreach($_POST['rep'] as $rep) {
        if($rep != $lasrep) {
            $lasrep = $rep;
            echo "<h1>$rep</h1>\n";
            $newrep = str_replace(".", "_", $rep);
            if(isset($_POST[$newrep])) {
                foreach($_POST[$newrep] as $val) {
                    echo "<h3>$val</h3>\n";
                    $json = replace_first($json, $rep, $val);
                }
            }
        }
    }
    $json = json_decode($json, true);
    send($json);
}