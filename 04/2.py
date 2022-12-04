with open('test.txt') as f:
    count = 0
    for l in f:
        a, b = l.replace('\n', '').split(',')
        min1, max1 = [int(a) for a in a.split('-')]
        min2, max2 = [int(a) for a in b.split('-')]
        if (max1 >= min2) and (max2 >= min1):
            count += 1
    print(count)