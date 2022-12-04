with open('input.txt') as f:
    count = 0
    for l in f:
        a, b = l.replace('\n', '').split(',')
        min1, max1 = [int(a) for a in a.split('-')]
        min2, max2 = [int(a) for a in b.split('-')]
        if (min1 <= min2 and max1 >= max2) or (min2 <= min1 and max2 >= max1):
            count += 1
    print(count)