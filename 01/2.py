with open('input.txt') as file:
    sums = []
    curr = 0
    for line in file:
        if '\n' == line:
            sums.append(curr)
            curr = 0
        else:
            curr += int(line)
    sums.sort()
    print(sum(sums[-3:]))