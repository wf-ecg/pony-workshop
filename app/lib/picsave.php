<?php
#
$SERV = $_SERVER;
$dbg = 0;
$doc = $SERV[DOCUMENT_ROOT];
$dir = dirname(dirname($SERV[PHP_SELF]));
$pic = "$_POST[pic]";
$sub = $dir . '/ponies/';

header('Access-Control-Allow-Origin: *');

function splitData($pic) {
  $arr = preg_split('/::/', $pic);
  return $arr;
}

function ensureDir($path) {
  if (!is_dir($path)) {
    mkdir($path, 0777);
    chmod($path, 0777);
  }
}

function picSaver($pic, $dir) {
  global $doc;

  if (!empty($pic)) {
    $pair = splitData($pic);
  }
  if (!empty($pair[1])) {
    ensureDir($doc . $dir);
    $nom = "$pair[0].jpg";
    file_put_contents($doc . $dir . $nom, base64_decode($pair[1]));
  }
  return $nom;
}

$nom = picSaver($pic, $sub);
$json = array(
    'name' => $nom,
    'path' => $sub,
);

if (!$dbg && !empty($pic)) {
  header('Content-type: application/json');
  echo json_encode($json);
  die();
}
?><!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>pic</title>
  </head>
  <body>
    <pre><?php
      if ($dbg) {
        ini_set('display_errors', 1);
        print_r($json);
        print_r($SERV);
      }
      ?></pre>
  </body>
</html>
