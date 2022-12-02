m = {
    'A': 1,
    'B': 2,
    'C': 3,
    'X': 1,
    'Y': 2,
    'Z': 3,
}

with open('input.txt') as f:
    score = 0
    for l in f:
        o = l[0]
        p = l[2]
        score += m[p] 
        if m[o] == m[p]:
            score += 3
        elif m[o] - m[p] == -1 or m[o] - m[p] == 2:
            score += 6
    print(score)
