import random

fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]
numbers = [1, 2, 3, 4, 5]

def shuffle_list(lst):
    random.shuffle(lst)

shuffle_list(fruits)

for fruit in fruits:
    print(fruit)

total = sum(numbers)
print(f"Sum of numbers: {total}")

matrix = [[random.randint(1, 100) for _ in range(3)] for _ in range(3)]

for row in matrix:
    print(" ".join(map(str, row)))

def create_person(name, age):
    return {"name": name, "age": age}

person = create_person("Alice", 30)
print(f"{person['name']} is {person['age']} years old.")
