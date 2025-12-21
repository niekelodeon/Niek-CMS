import Foundation

var fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]
var numbers = Array(1...5)

func shuffleArray<T>(_ array: [T]) -> [T] {
    return array.shuffled()
}

let shuffledFruits = shuffleArray(fruits)

for fruit in shuffledFruits {
    print(fruit.uppercased())
}

let total = numbers.reduce(0, +)
print("Sum of numbers: \(total)")

var matrix: [[Int]] = []
for _ in 0..<3 {
    var row: [Int] = []
    for _ in 0..<3 {
        row.append(Int.random(in: 1...100))
    }
    matrix.append(row)
}

for row in matrix {
    print(row.map { String($0) }.joined(separator: " "))
}

struct Person {
    let name: String
    let age: Int
    let location: String
}

let person = Person(name: "Alice", age: 30)
print("\(person.name) is \(person.age) years old.")

class RandomObject {
    var id: Int
    var value: String
    
    init(id: Int, value: String) {
        self.id = id
        self.value = value
    }
    
    func display() -> String {
        return "Object \(id): \(value)"
    }
}

var objects: [RandomObject] = []
for i in 0..<3 {
    objects.append(RandomObject(id: i, value: fruits[i % fruits.count]))
}

for obj in objects {
    print(obj.display())
}
