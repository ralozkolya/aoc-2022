def get_code(char):
    o = ord(char)
    if o > 96:
        return o - 96
    return o - 38

with open('input.txt') as f:
    s = 0
    for l in f:
        m = {}
        h = int(len(l) / 2)
        st = l[h:]
        for i in range(h):
            c = l[i]
            if (c in st):
                print(get_code(c), c)
                s += get_code(c)
                break
    print(s)