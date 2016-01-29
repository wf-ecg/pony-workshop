<?php
#
header('Access-Control-Allow-Origin: *');

$SERV = $_SERVER;
$dbg = 0;
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
              $nom = "$pair[0].jpg";
              file_put_contents($dir . $nom, base64_decode($pair[1]));
          }
          if (!$dbg) {
              print_r($nom);
          }
      }

      picSaver($_POST[pic]);

      ?>
  </body>
</html>
