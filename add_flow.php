<?php

    function conti($index, $arr) {
        
        $keys = array_keys($arr);
        
        if($index+1 == count($arr)) return null;
        else {
            $type = "text";
            $text = $arr[$index];
            $responseType = "text";
            $response = $arr[$index+1];

            return array(
                "type" => $type,
                "text" => $text,
                "responseType" => $responseType,
                "response" => $response,
                "continue" => conti($index+2, $arr)
            );
        }
    }

    function formatArray($arr) {
        $lastval = 0;
        $basearr = array();
        $newarr = array();
        $keymaier = array_keys($arr);
        //print_r($keymaier);
        foreach($keymaier as $value) {
            if($value[0] != $lastval) {
                $lastval = $value[0];
                array_push($basearr, $newarr);
                $newarr = array();
            }
            array_push($newarr, $arr[$value]);
        }
        array_push($basearr, $newarr);
        return $basearr;
    }

    if(isset($_POST['access_token']) && $_POST['access_token'] == "DeiMamsel") {
        
        include_once "db_conn.php";
        
        $nutzer = "Matteo";
        
        $format = formatArray($_POST);
        
        $flow = json_encode(conti(0, $format));
        
        $add_flow = $conn->prepare("INSERT INTO flows(nutzer, flow, zeit) VALUES(?, ?, NOW())");
        $add_flow->bind_param("ss", $nutzer, $flow);
        $add_flow->execute();
        $add_flow->close();
        
        echo "SUCCESS";
        
    } else {
        echo "ERROR";
    }
    
?>