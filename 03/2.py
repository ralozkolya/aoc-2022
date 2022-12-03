def get_code(char):
    o = ord(char)
    if o > 96:
        return o - 96
    return o - 38

with open('input.txt') as f:
    lines = []
    for l in f:
        line = set([c for c in l.replace('\n', '')])
        lines.append(''.join(line))
    
    m = {}
    s = 0
    for i in range(len(lines)):
        if not i % 3:
            m = {}
        l = lines[i]
        for c in l:
            m[c] = 1 if c not in m else m[c] + 1
            if m[c] == 3:
                print(get_code(c), c)
                s += get_code(c)
                break
    print(s)