<?php
// minimal router
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
header('Content-Type: application/json');

if ($uri === '/health') { echo json_encode(['status'=>'ok']); exit; }
if ($uri === '/fib') {
  $n = isset($_GET['n']) ? intval($_GET['n']) : 10;
  function fib($n){ return $n<2?$n: fib($n-1)+fib($n-2); }
  echo json_encode(['n'=>$n,'value'=>fib($n)]); exit;
}
if ($uri === '/stats' && $_SERVER['REQUEST_METHOD']==='POST') {
  $body = json_decode(file_get_contents('php://input'), true);
  $text = strtolower($body['text'] ?? '');
  preg_match_all("/\b[0-9a-zа-яё']+\b/iu", $text, $matches);
  $words = $matches[0] ?? [];
  $counts = array_count_values($words);
  arsort($counts);
  $top = array_slice($counts,0,5,true);
  $topArr = [];
  foreach ($top as $k=>$v) $topArr[] = ['word'=>$k,'count'=>$v];
  echo json_encode(['words'=>count($words),'top'=>$topArr,'sha256'=>hash('sha256',$text)]);
  exit;
}
http_response_code(404);
echo json_encode(['error'=>'not found']);
