import re

with open('input.txt') as f:
    m = {}
    for l in f:

        if l.startswith('move'):
            print(m)
            print(l)
            a, f, t = [int(c) for c in re.findall(r'\d+', l)]
            cur_len = len(m[t])
            for i in range(a):
                m[t].insert(cur_len, m[f].pop())
            continue

        for i in range(0, len(l), 4):
            c = l[i]
            if c == '[':
                j = int(i/4) + 1
                if j not in m:
                    m[j] = []
                m[j].insert(0, l[i + 1])
                
    print(m)
    s = ''
    for i in range(1, len(m) + 1):
        s += m[i].pop()
    print(s)
