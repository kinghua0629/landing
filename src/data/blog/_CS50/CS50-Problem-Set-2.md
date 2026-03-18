---
title: CS50 Problem Set 2
author: King Hua
pubDatetime: 2026-03-18T11:23:16Z
tags:
  - CS50
description: Answer for CS50 Problem Set 2
---
## Table of contents

# CS50 Problem Set 2
Here's my answer for the CS50 Problem Set 2. Hope that will help you a bit. 
![](https://cdn.jsdelivr.net/gh/kinghua0629/kinghua0629-blog-img/20260318203536655.webp)

## Problem 1: [Scrabble](https://cs50.harvard.edu/x/psets/2/scrabble/#scrabble)

```c
#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

int compute_score(string word);

int points[] = {1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};

int main(void)
{
    string word1 = get_string("Player 1: ");
    string word2 = get_string("Player 2: ");

    int score1 = compute_score(word1);
    int score2 = compute_score(word2);

    if (score1 > score2)
    {
        printf("Player 1 wins!\n");
        return 0;
    }
    else if (score1 < score2)
    {
        printf("Player 2 wins!\n");
        return 0;
    }
    else
    {
        printf("Tie!\n");
        return 0;
    }
}

int compute_score(string word)
{
    int score = 0;

    for (int i = 0; i < strlen(word); i++)
    {
        if (isupper(word[i]))
        {
            score += points[word[i] - 'A'];
        }
        else if (islower(word[i]))
        {
            score += points[word[i] - 'a'];
        }
    }
    return score;
}
```

## Problem 2: [Readability](https://cs50.harvard.edu/x/psets/2/readability/#readability)

```c
#include <cs50.h>
#include <ctype.h>
#include <math.h>
#include <stdio.h>
#include <string.h>

int letters(string text);
int sentences(string text);
int words(string text);

int main(void)
{
    string text = get_string("Text: ");

    int index = (int) round(0.0588 * letters(text) / words(text) * 100 -
                            0.296 * sentences(text) / words(text) * 100 - 15.8);

    if (index < 1)
    {
        printf("Before Grade 1\n");
        return 0;
    }
    else if (index >= 16)
    {
        printf("Grade 16+\n");
        return 0;
    }
    else
    {
        printf("Grade %i\n", index);
        return 0;
    }
}

int words(string text)
{
    int words = 1;
    for (int i = 0; i < strlen(text); i++)
    {
        if (text[i] == ' ')
        {
            words += 1;
        }
    }
    return words;
}

int letters(string text)
{
    int letters = 0;
    for (int i = 0; i < strlen(text); i++)
    {
        if (isalpha(text[i]))
        {
            letters += 1;
        }
    }
    return letters;
}

int sentences(string text)
{
    int sentences = 0;
    for (int i = 0; i < strlen(text); i++)
    {
        if (text[i] == '.' || text[i] == '!' || text[i] == '?')
        {
            sentences += 1;
        }
    }
    return sentences;
}
```

## Problem 3: [Substitution](https://cs50.harvard.edu/x/psets/2/substitution/#substitution)

```c
#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>

int main(int argc, string argv[])
{
    string key = argv[1];
    if (argc != 2)
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }
    else if (strlen(argv[1]) != 26)
    {
        printf("Key must contain 26 characters.\n");
        return 1;
    }
    else
    {
        for (int i = 0, n = strlen(key); i < n; i++)
        {
            if (isalpha(argv[1][i]) == 0)
            {
                printf("Key should be all alphabets.\n");
                return 1;
            }

            for (int j = i + 1; j < n; j++)
            {
                if (argv[1][i] == argv[1][j] || argv[1][i] + 32 == argv[1][j] ||
                    argv[1][i] - 32 == argv[1][j])
                {
                    printf("There should be no duplicate in the key.\n");
                    return 1;
                }
            }
        }
        string ptext = get_string("plaintext:  ");
        printf("ciphertext: ");
        for (int i = 0, length = strlen(ptext); i < length; i++)
        {
            if (isupper(ptext[i]))
            {
                char result = toupper(key[ptext[i] - 'A']);
                printf("%c", result);
            }
            else if (islower(ptext[i]))
            {
                char result = tolower(key[ptext[i] - 'a']);
                printf("%c", result);
            }
            else
            {
                printf("%c", ptext[i]);
            }
        }
        printf("\n");
        return 0;
    }
}
```
