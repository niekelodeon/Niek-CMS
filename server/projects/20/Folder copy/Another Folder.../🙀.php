<?php

$colors = ['red', 'green', 'blue', 'yellow', 'purple'];
$numbers = range(1, 10);

function shuffleArray($array) {
    $result = [];
    while(count($array) > 0) {
        $index = rand(0, count($array) - 1);
        $result[] = $array[$index];
        array_splice($array, $index, 1);
    }
    return $result;
}

$shuffledColors = shuffleArray($colors);

foreach($shuffledColors as $color) {
    echo strtoupper($color) . "\n";
}

$total = array_reduce($numbers, fn($carry, $item) => $carry + $item, 0);

echo "Sum of numbers: $total\n";

$matrix = [];
for($i = 0; $i < 5; $i++) {
    $matrix[$i] = [];
    for($j = 0; $j < 5; $j++) {
        $matrix[$i][$j] = rand(0, 100);
    }
}

$flatten = array_merge(...$matrix);

rsort($flatten);

print_r($flatten);

$randomKey = array_rand($colors);
echo "Random color: " . $colors[$randomKey] . "\n";

class RandomObject {
    public $id;
    public $value;
    public function __construct($id, $value) {
        $this->id = $id;
        $this->value = $value;
    }
    public function display() {
        return "Object {$this->id}: {$this->value}";
    }
}

$objects = [];
for($k = 0; $k < 3; $k++) {
    $objects[] = new RandomObject($k, $colors[$k % count($colors)]);
}

foreach($objects as $obj) {
    echo $obj->display() . "\n";
}

?>
