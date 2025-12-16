math.randomseed(os.time())

local fruits = {"Apple", "Banana", "Cherry", "Date", "Elderberry"}
local numbers = {1, 2, 3, 4, 5}

function shuffle(tbl)
    for i = #tbl, 2, -1 do
        local j = math.random(i)
        tbl[i], tbl[j] = tbl[j], tbl[i]
    end
end

shuffle(fruits)

for i, fruit in ipairs(fruits) do
    print(fruit)
end

local sum = 0
for _, num in ipairs(numbers) do
    sum = sum + num
end

print("Sum of numbers: " .. sum)

local table2D = {}
for i = 1, 3 do
    table2D[i] = {}
    for j = 1, 3 do
        table2D[i][j] = math.random(1, 100)
    end
end

for i = 1, #table2D do
    for j = 1, #table2D[i] do
        io.write(table2D[i][j] .. " ")
    end
    print()
end

function createPerson(name, age)
    return {name = name, age = age}
end

local person1 = createPerson("Alice", 30)
print(person1.name .. " is " .. person1.age .. " years old.")
