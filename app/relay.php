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
            $hdrs = "From: $from\n";
            $hdrs.= "Cc: $arr[cc]\n";
            $sub = "$arr[sub]" ? "$arr[sub]" : "Message from $WHO";
            $ref0 = preg_replace('/http.+?\b|\.\w+$/', '', "$SERV[HTTP_REFERER]");
            $ref = preg_replace('/\/|\./', ' ', "$ref0");

            $msg = "<!DOCTYPE HTML><html lang=en>\n
<head><meta charset=\"utf-8\"></head>\n
<body style=\"margin:0\">\n $arr[msg]\n
<small style=\"color: white;\">
    from $SERV[REMOTE_ADDR] via $SERV[REQUEST_METHOD]relay ⌘ $ref
</small>\n</body>\n</html>";

            if ($dbg) {
                $hdrs.= "Bcc: david.turgeon@wellsfargo.com\n";
            }
            $hdrs.= "Content-Type: text/html;\n charset=utf-8\n";

            return mail("$arr[to]", $sub, $msg, $hdrs);
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
