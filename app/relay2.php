<!DOCTYPE HTML>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>⌘</title>
    </head>
    <body><?php
        $SERV = $_SERVER;
        $OK = false;
        $dbg = 1;

        if ($dbg) {
            ini_set('display_errors', 1);
            echo '<pre>';
            print_r($SERV);
        }

        function valuable($key, $arr) {
            global $dbg;

            $rez = (array_key_exists($key, $arr) && "$arr[$key]");
            if (!$rez && $dbg) {
                echo "<b>no value: $key</b><br>";
            }
            return $rez;
        }

        function sendable($arr) { // REQUIRE "to" AND "key"
            if (valuable('to', $arr)) {
                return valuable('key', $arr);
            } else {
                return false;
            }
        }
        function makeCid($pic) {
            $sep = sha1(date('r', time()));
            $dat = chunk_split($pic, 70);

            $str = "\r\n
--PHP-related-{$sep}\r\n
Content-Type: image/jpeg\r\n
Content-Transfer-Encoding: base64\r\n
Content-ID: <PHP-CID-{$sep}>\r\n
Content-Transfer-Encoding: base64\r\n\r\n
$dat\r\n";
            $rtn = array($sep, $str);

            return $rtn;
        }

        function mergePic($pic, $msg1) {
                $pair = makeCid($pic);

                $msg2 = preg_replace('/PPPIIICCC/', "cid:PHP-CID-$pair[0]", $msg1);
                $msg3 .= "$msg2\r\n\r\n
$pair[1]";
                return $msg3;
        }

        function mailer($arr) {
            global $dbg, $SERV;

            $WHO = "$SERV[REMOTE_ADDR]";
            $RLY = '';
            $KEY = $arr['key'];

            if ($WHO != $KEY && $KEY != '***') {
                return false; // key must match client ip
            }
            if ("$SERV[SERVER_ADDR]" == "10.89.101.100") {
                $RLY = 'QLA';
            } else {
                $RLY = 'ECG';
            }
            $from = "$arr[from]" ? "$arr[from]" : "$RLY-Mail-Relay";
            $cc = $arr[cc];
            $sub = "$arr[sub]" ? "$arr[sub]" : "Message from $WHO";
            $ref0 = preg_replace('/http.+?\b|\.\w+$/', '', "$SERV[HTTP_REFERER]");
            $ref = preg_replace('/\/|\./', ' ', "$ref0");
            $pic = "$arr[pic]";

            $headers = array();
            $headers[] = "MIME-Version: 1.0";
            $headers[] = "Content-type: text/html; charset=utf-8";
            $headers[] = "From: <{$from}>";
            if ($dbg) {
                $headers[] = "Bcc: <david.turgeon@wellsfargo.com>";
            }
            $headers[] = "Cc: <{$cc}>";
            $headers[] = "Reply-To: <{$from}>";
            $headers[] = "Subject: {$sub}";
            $headers[] = "X-Mailer: PHP/" . phpversion();

            $msg = array();
            $msg[] = "<!DOCTYPE HTML><html lang=en>";
            $msg[] = "<head><meta charset=\"utf-8\"></head>";
            $msg[] = "<body style=\"margin:0\">";
            $msg[] = "{$arr[msg]}";
            $msg[] = "</body></html>";

            if (!empty($pic)) {
                $msg = mergePic($pic, implode("\r\n", $msg));
            }
            print_r($msg);

            //return mail("$arr[to]", $sub, $msg, implode("\r\n", $headers));
        }

        if (sendable($_POST)) {
            $data = $_POST;
        } else if (sendable($_GET)) {
            $data = $_GET;
        } else {
            $data = '';
        }

        if (sendable($data)) {
            $OK = $data && mailer($data);
        }

        $REZ = json_encode(array(
            'stat' => $OK ? 'sent' : 'fail',
            'refr' => "$SERV[HTTP_REFERER]"
        ));
        ?><script>
            var W = window,
                R = <?php echo $REZ; ?>,
                S = (R.stat === 'fail') ? 3 : 1;

            W.setTimeout(function () {
                if (S > 1) {
                    W.history.go(-1);
                } else {
                    W.location = R.refr + '#' + R.stat;
                }
            }, S * 1000);
        </script>
    </body>
</html>
