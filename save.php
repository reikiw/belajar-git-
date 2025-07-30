<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $todos = json_decode($json, true);

    $output = "";
    foreach ($todos as $todo) {
        $status = $todo['completed'] ? '[x]' : '[ ]';
        $output .= $status . ' ' . $todo['text'] . PHP_EOL;
    }

    file_put_contents('todos.txt', $output);
    echo "Daftar berhasil disimpan ke todos.txt";
} else {
    echo "Hanya menerima POST request.";
}
?>
