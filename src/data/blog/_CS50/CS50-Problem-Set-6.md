---
title: CS50 Problem Set 6
author: King Hua
pubDatetime: 2026-03-18T11:31:16Z
tags:
  - CS50
description: Answer for CS50 Problem Set 6
---
## Table of contents

# CS50 Problem Set 6
Here's my answer for the CS50 Problem Set 6. Hope that will help you a bit. 
![](https://cdn.jsdelivr.net/gh/kinghua0629/kinghua0629-blog-img/20260318203536655.webp)

## Problem 1: [Hello, Again](https://cs50.harvard.edu/x/psets/6/hello/#hello-again)
```python
name = input("What is your name? ")

print(f"hello, {name}")
```

## Probelm 2: [Mario](https://cs50.harvard.edu/x/psets/6/mario/more/#mario)
```python
while True:
    try:
        h = int(input("Height: "))

        if 1 <= h <= 8:
            break
        else:
            print("", end='')
    except ValueError:
        print("", end='')

for i in range(1, h+1):
    for j in range(0, h-i):
        print(" ", end='')
#        j += 1

    for k in range(0, i):
        print("#", end='')
#        k += 1

    print("  ", end='')

    for m in range(0, i):
        print("#", end='')
#        m += 1

    print()
```

## Problem 3: [Credit](https://cs50.harvard.edu/x/psets/6/credit/#credit)
```python
while True:
    number = input("Number: ")
    if number.isdigit() == True:
        break
    else:
        number = input("Number: ")

reversed_number = number[::-1]

if len(number) == 15:
    sum = 0
    temp_sum_1 = 0
    temp_sum_2 = 0
    if number[:2] != "37" and number[:2] != "34":
        print("INVALID")
    else:
        for i in range(1, 15, 2):
            temp = int(reversed_number[i]) * 2
            if temp > 9:
                temp = temp // 10 + temp % 10
            temp_sum_1 += temp

        for i in range(0, 15, 2):
            temp = int(reversed_number[i])
            temp_sum_2 += temp

        sum = temp_sum_1 + temp_sum_2
        if sum % 10 == 0:
            print("AMEX")
        else:
            print("INVALID")

elif len(number) == 13:
    sum = 0
    temp_sum_1 = 0
    temp_sum_2 = 0
    if number[:1] != "4":
        print("INVALID")
    else:
        for i in range(1, 13, 2):
            temp = int(reversed_number[i]) * 2
            if temp > 9:
                temp = temp // 10 + temp % 10
            temp_sum_1 += temp

        for i in range(0, 13, 2):
            temp = int(reversed_number[i])
            temp_sum_2 += temp

        sum = temp_sum_1 + temp_sum_2
        if sum % 10 == 0:
            print("VISA")
        else:
            print("INVALID")

elif len(number) == 16:
    sum = 0
    temp_sum_1 = 0
    temp_sum_2 = 0
    if number[:1] != "4" and number[:2] != "51" and number[:2] != "52" and number[:2] != "53" and number[:2] != "54" and number[:2] != "55":
        print("INVALID")
    elif number[:1] == "4":
        for i in range(1, 16, 2):
            temp = int(reversed_number[i]) * 2
            if temp > 9:
                temp = temp // 10 + temp % 10
            temp_sum_1 += temp

        for i in range(0, 16, 2):
            temp = int(reversed_number[i])
            temp_sum_2 += temp

        sum = temp_sum_1 + temp_sum_2
        if sum % 10 == 0:
            print("VISA")
        else:
            print("INVALID")
    else:
        for i in range(1, 16, 2):
            temp = int(reversed_number[i]) * 2
            if temp > 9:
                temp = temp // 10 + temp % 10
            temp_sum_1 += temp

        for i in range(0, 16, 2):
            temp = int(reversed_number[i])
            temp_sum_2 += temp

        sum = temp_sum_1 + temp_sum_2
        if sum % 10 == 0:
            print("MASTERCARD")
        else:
            print("INVALID")

else:
    print("INVALID")
```

## Problem 4: [Readability](https://cs50.harvard.edu/x/psets/6/readability/#readability)
```python
def words(text):
    words = 1
    for i in range(0, len(text)):
        if text[i] == ' ':
            words += 1
    return words


def letters(text):
    letters = 0
    for i in range(0, len(text)):
        if text[i].isalpha() == True:
            letters += 1
    return letters


def sentences(text):
    sentences = 0
    for i in range(0, len(text)):
        if text[i] == '.' or text[i] == '!' or text[i] == '?':
            sentences += 1
    return sentences


text = input("Text: ")

index = round(0.0588 * letters(text) / words(text) * 100 -
              0.296 * sentences(text) / words(text) * 100 - 15.8)

if index < 1:
    print("Before Grade 1")

elif index >= 16:
    print("Grade 16+")
else:
    print(f"Grade {index}")
```

## Problem 5: [DNA](https://cs50.harvard.edu/x/psets/6/dna/#dna)
```python
import csv
import sys


def main():

    # TODO: Check for command-line usage
    if len(sys.argv) != 3:
        print("Missing command line arguments! ")
        sys.exit()

    # TODO: Read database file into a variable
    database = []
    with open(sys.argv[1], "r") as database_file:
        reader = csv.DictReader(database_file)
        for row in reader:
            database.append(row)

    # TODO: Read DNA sequence file into a variable
    sequence = []
    with open(sys.argv[2], "r") as sequence_file:
        sequence = sequence_file.read()

    # TODO: Find longest match of each STR in DNA sequence
    str_count = {}  # Initlize a list
    for key in database[0].keys():
        if key == "name":
            continue
        # When you insert a value but the key doesn't exist, python will create the key automatically and insert the value
        str_count[key] = longest_match(sequence, key)

    # TODO: Check database for matching profiles
    for row in database:
        match = True
        # 遍历所有的key，并去除'name'
        for key in row.keys():
            if key == "name":
                continue
            # 当row[key]与str_count[key]不相等时，返回false，继续下一个key
            if str_count[key] != int(row[key]):
                match = False
                break
        if match:
            print(row["name"])
            return
    print("No match")


def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):

        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move substring to next potential match in sequence
        # Continue moving substring and checking for matches until out of consecutive matches
        while True:

            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1

            # If there is no match in the substring
            else:
                break

        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    # After checking for runs at each character in sequence, return longest run found
    return longest_run


main()
```
