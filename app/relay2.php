<?php
#
header('Access-Control-Allow-Origin: *');
$OK = false;
$SERV = $_SERVER;
$dbg = 1;
$dir = '../ponies/';
#
?>
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>⌘</title>
  </head>
  <body><?php
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

      function splitData($pic) {
          $arr = preg_split('/::/', $pic);
          return $arr;
      }

      function ensureDir($dir) {
          if (!is_dir($dir)) {
              mkdir($dir, 0777);
              chmod($dir, 0777);
          }
      }

      function picSaver($pic) {
          global $dbg, $dir;

          if (!empty($pic)) {
              $pair = splitData($pic);
          }
          if (!empty($pair[1])) {
              ensureDir($dir);
              file_put_contents($dir . $pair[0] . '.jpg', base64_decode($pair[1]));
          }
          if ($dbg) {
              print_r($pair);
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
          $msg[] = "{$body}";
          $msg[] = "</body></html>";
          if ($dbg) {
              print_r(implode("\r\n", $msg));
          }

          if (!empty($pic)) {
              picSaver($pic);
          }
          return mail($to, $sub, implode("\r\n", $msg), implode("\r\n", $head));
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
