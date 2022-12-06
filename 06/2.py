def different(str):
    return len(str) == len(set(str))

pl = 14

with open('input.txt') as f:
    c = f.read()
    for i in range(pl, len(c)):
        if different(c[i-pl:i]):
            print(i)
            break
