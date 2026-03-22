---
title: CS50 Problem Set 1
author: King Hua
pubDatetime: 2026-03-18T11:21:16Z
tags:
  - CS50
description: Answer for CS50 Problem Set 1
---

## Table of contents

# CS50 Problem Set 1

Here's my answer for the CS50 Problem Set 1. Hope that will help you a bit.
![](https://cdn.jsdelivr.net/gh/kinghua0629/kinghua0629-blog-img/20260318203536655.webp)

## Problem 1: [Hello, It’s Me](https://cs50.harvard.edu/x/psets/1/me/#hello-its-me)

```c file=hello.c
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    string name = get_string("What's your name?\n");
    printf("Hello, %s\n", name);
    return 0;
}
```

## Problem 2: [Mario](https://cs50.harvard.edu/x/psets/1/mario/more/#mario)

```c file=mario.c
#include <cs50.h>
#include <stdio.h>

void mario(int n);

int main(void)
{
    int n;
    do
    {
        n = get_int("Height: ");
    }
    while (n < 1 || n > 8);
    mario(n);
    return 0;
}

void mario(int n)
{
    for (int i = 1; i < n + 1; i++)
    {
        for (int j = 0; j < n - i; j++)
        {
            printf(" ");
        }

        for (int k = 0; k < i; k++)
        {
            printf("#");
        }

        printf("  ");

        for (int k = 0; k < i; k++)
        {
            printf("#");
        }
        //        for (int j = 0; j < n - i; j++)
        //        {
        //            printf(" ");
        //        }

        printf("\n");
    }
}
```

## Problem 3: [Cash](https://cs50.harvard.edu/x/psets/1/cash/)

```c file=cash.c
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int cash;
    do
    {
        cash = get_int("Change owed: ");
    }
    while (cash < 0);

    int n_25 = 0;
    int n_10 = 0;
    int n_5 = 0;
    int n_1 = 0;
    int sum = 0;

    while (cash > 24)
    {
        cash -= 25;
        n_25 += 1;
    }
    // printf("%d\n", n_25);

    while (cash > 9)
    {
        cash -= 10;
        n_10 += 1;
    }
    // printf("%d\n", n_10);

    while (cash > 4)
    {
        cash -= 5;
        n_5 += 1;
    }
    // printf("%d\n", n_5);

    while (cash > 0)
    {
        cash -= 1;
        n_1 += 1;
    }
    // printf("%d\n", n_1);
    sum = n_25 + n_10 + n_5 + n_1;
    printf("%d\n", sum);
    return 0;
}
```
