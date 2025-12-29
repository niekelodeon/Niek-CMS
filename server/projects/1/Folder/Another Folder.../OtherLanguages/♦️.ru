fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]
numbers = (1..5).to_a

def shuffle_array(array)
  array.shuffle
end

shuffled_fruits = shuffle_array(fruits)

shuffled_fruits.each do |fruit|
  puts fruit.upcase
end

total = numbers.reduce(:+)
puts "Sum of numbers: #{total}"

matrix = Array.new(3) { Array.new(3) { rand(1..100) } }

matrix.each do |row|
  puts row.join(" ")
end

def create_person(name, age)
  { name: name, age: age }
end

person = create_person("Alice", 30)
puts "#{person[:name]} is #{person[:age]} years old."

class RandomObject
  attr_accessor :id, :value
  def initialize(id, value)
    @id = id
    @value = value
  end
  def display
    "Object #{@id}: #{@value}"
  end
end

objects = (0..2).map { |i| RandomObject.new(i, fruits[i % fruits.size]) }
objects.each { |obj| puts obj.display }
