m = {
    'A': 1,
    'B': 2,
    'C': 3,
}

w = {
    'A': 2,
    'B': 3,
    'C': 1,
}

ls = {
    'A': 3,
    'B': 1,
    'C': 2,
}

with open('input.txt') as f:
    score = 0
    for l in f:
        o = l[0]
        p = l[2]
        if p == 'X':
            score += ls[o]
        elif p == 'Y':
            score += 3 + m[o]
        else:
            score += 6 + w[o]
    print(score)
