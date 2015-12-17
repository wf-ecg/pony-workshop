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
      $dbg = 1;
      $dir = '../ponies/';

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

      function maker($arr) {
          global $dbg, $dir;

          $pic = "$arr[pic]";

          if (!empty($pic)) {
              $pic = "$arr[pic]";
          }

          $pair = splitData($pic);

          if (!empty($pair[1])) {
              ensureDir($dir);
              file_put_contents($dir . $pair[0] . '.jpg', base64_decode($pair[1]));
          }

          if ($dbg) {
              print_r($pair);
          }
      }

      maker($_POST);
      ?>
  </body>
</html>
