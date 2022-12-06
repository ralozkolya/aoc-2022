def different(str):
    return len(str) == len(set(str))

with open('input.txt') as f:
    c = f.read()
    for i in range(4, len(c)):
        if different(c[i-4:i]):
            print(i)
            break
