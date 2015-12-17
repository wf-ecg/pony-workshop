<?php
header('Access-Control-Allow-Origin: *');
?>
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>⌘</title>
  </head>
  <body><?php
      header('Access-Control-Allow-Origin: *');
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

          $cid = array();
          $cid[] = "--PHP-related-{$sep}";
          $cid[] = "Content-Type: image/jpeg; name=pic.jpg";
          $cid[] = "Content-Disposition: inline; filename=pic.jpg";
          $cid[] = "Content-Transfer-Encoding: base64";
          $cid[] = "Content-ID: <PHP-CID-{$sep}>";
          $cid[] = "";
          $cid[] = "{$dat}";
          $cid[] = "";
          $cid[] = "--PHP-related-{$sep}";

          return array($sep, implode("\r\n", $cid));
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
          $body = "$arr[msg]";
          $pic = "$arr[pic]";
          $to = $arr[to];
          $cc = $arr[cc];

          $from = "$arr[from]" ? "$arr[from]" : "$RLY-Mail-Relay";
          $sub = "$arr[sub]" ? "$arr[sub]" : "Message from $WHO";

          $ref0 = preg_replace('/http.+?\b|\.\w+$/', '', "$SERV[HTTP_REFERER]");
          $ref = preg_replace('/\/|\./', ' ', "$ref0");

          $head = array();
          $head[] = "MIME-Version: 1.0";
          $head[] = "Content-type: text/html; charset=utf-8";
          $head[] = "From: <{$from}>";
          if ($dbg) {
              $head[] = "Bcc: <david.turgeon@wellsfargo.com>";
          }
          $head[] = "Cc: <{$cc}>";
          $head[] = "Reply-To: <{$from}>";
          $head[] = "Subject: {$sub}";
          $head[] = "X-Mailer: PHP/" . phpversion();
          $head[] = "";

          $msg = array();
          $msg[] = "<!DOCTYPE HTML><html lang=en>";
          $msg[] = "<head><meta charset=\"utf-8\"></head>";
          $msg[] = "<body style=\"margin:0\">";

          if (empty($pic)) {
              $msg[] = "{$body}";
              $msg[] = "</body></html>";
          } else {
              $cid = makeCid($pic); // array [separator, data]
              $body = preg_replace('/PPPIIICCC/', "cid:PHP-CID-$cid[0]", $body);

              $msg[] = "{$body}";
              $msg[] = "</body></html>";
              $msg[] = "";
              $msg[] = "{$cid[1]}";
          }

          print_r(implode("\r\n", $msg));
          //return mail($to, $sub, implode("\r\n", $msg), implode("\r\n", $head));
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
