with open('input.txt') as file:
    _max = 0
    curr = 0
    for line in file:
        if '\n' == line:
            _max = max(_max, curr)
            curr = 0
        else:
            curr += int(line)
    print(_max)