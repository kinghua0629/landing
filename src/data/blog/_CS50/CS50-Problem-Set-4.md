---
title: CS50 Problem Set 4
author: King Hua
pubDatetime: 2026-03-18T11:27:16Z
tags:
  - CS50
description: Answer for CS50 Problem Set 4
---
## Table of contents

# CS50 Problem Set 4
Here's my answer for the CS50 Problem Set 4. Hope that will help you a bit. 
![](https://cdn.jsdelivr.net/gh/kinghua0629/kinghua0629-blog-img/20260318203536655.webp)

## Problem 1: [Volume](https://cs50.harvard.edu/x/psets/4/volume/#volume)
```c
// Modifies the volume of an audio file

#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

// Number of bytes in .wav header
const int HEADER_SIZE = 44;

int main(int argc, char *argv[])
{
    // Check command-line arguments
    if (argc != 4)
    {
        printf("Usage: ./volume input.wav output.wav factor\n");
        return 1;
    }

    // Open files and determine scaling factor
    FILE *input = fopen(argv[1], "r");
    if (input == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    FILE *output = fopen(argv[2], "w");
    if (output == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    float factor = atof(argv[3]);

    // TODO: Copy header from input file to output file
    uint8_t header[44];
    fread(&header, 44, 1, input);
    fwrite(&header, 44, 1, output);

    // TODO: Read samples from input file and write updated data to output file
    int16_t buffer;

    while (fread(&buffer, sizeof(int16_t), 1, input))
    {
        buffer *= factor;
        fwrite(&buffer, sizeof(int16_t), 1, output);
    }

    // Close files
    fclose(input);
    fclose(output);
}
```

## Problem 2: [Filter](https://cs50.harvard.edu/x/psets/4/filter/less/#filter)
```c
#include "helpers.h"
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    int avg = 0;

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            avg = (int) round((image[i][j].rgbtRed + image[i][j].rgbtGreen + image[i][j].rgbtBlue) /
                              3.0);

            image[i][j].rgbtRed = avg;
            image[i][j].rgbtGreen = avg;
            image[i][j].rgbtBlue = avg;
        }
    }
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            int sepiaRed = (int) round(.393 * image[i][j].rgbtRed + .769 * image[i][j].rgbtGreen +
                                       .189 * image[i][j].rgbtBlue);
            int sepiaGreen = (int) round(.349 * image[i][j].rgbtRed + .686 * image[i][j].rgbtGreen +
                                         .168 * image[i][j].rgbtBlue);
            int sepiaBlue = (int) round(.272 * image[i][j].rgbtRed + .534 * image[i][j].rgbtGreen +
                                        .131 * image[i][j].rgbtBlue);
            // sepiaRed = .393 * originalRed + .769 * originalGreen + .189 * originalBlue
            // sepiaGreen = .349 * originalRed + .686 * originalGreen + .168 * originalBlue
            // sepiaBlue = .272 * originalRed + .534 * originalGreen + .131 * originalBlue

            // Make sure that if the value of sepiaRed, sepiaGreen and sepiaBlue exceed 255, their
            // value will be capped at 255
            if (sepiaRed > 255)
            {
                sepiaRed = 255;
            }
            if (sepiaGreen > 255)
            {
                sepiaGreen = 255;
            }
            if (sepiaBlue > 255)
            {
                sepiaBlue = 255;
            }

            image[i][j].rgbtRed = sepiaRed;
            image[i][j].rgbtGreen = sepiaGreen;
            image[i][j].rgbtBlue = sepiaBlue;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    int temp_width = 0;
    RGBTRIPLE temp[height][width];

    if (width % 2 == 0)
    {
        temp_width = width / 2;
    }
    else
    {
        temp_width = (width + 1) / 2;
    }
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < temp_width; j++)
        {
            // Swap pixels
            temp[i][j] = image[i][j];
            image[i][j] = image[i][width - 1 - j];
            image[i][width - 1 - j] = temp[i][j];
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // Create a copy of image
    RGBTRIPLE copy[height][width];
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            int tempRed = 0, tempGreen = 0, tempBlue = 0;
            float pixel_count = 0;
            copy[i][j] = image[i][j];

            // get the average of the pixel RGB values
            for (int m = i - 1; m <= i + 1; m++)
            {
                for (int n = j - 1; n <= j + 1; n++)
                {
                    if (m >= 0 && m < height && n >= 0 &&
                        n < width) // avoiding the pixels that cross the edge
                    {
                        tempRed += image[m][n].rgbtRed;
                        tempGreen += image[m][n].rgbtGreen;
                        tempBlue += image[m][n].rgbtBlue;

                        pixel_count += 1;
                    }
                }
            }
            copy[i][j].rgbtRed = round(tempRed / pixel_count);
            copy[i][j].rgbtGreen = round(tempGreen / pixel_count);
            copy[i][j].rgbtBlue = round(tempBlue / pixel_count);
        }
    }

    // give the value of copy[i][j] back to image[i][j]
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            image[i][j] = copy[i][j];
        }
    }
    return;
}
```

## Problem 3: [Recover](https://cs50.harvard.edu/x/psets/4/recover/#recover)
```c
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    // Accept a single command-line argument
    if (argc != 2)
    {
        printf("Usage: ./recover FILE\n");
        return 1;
    }

    // Open the memory card
    FILE *card = fopen(argv[1], "r");

    // Create a buffer for a block of data
    uint8_t buffer[512];
    int counter = 0;
    int found_image = 1;
    FILE *img;
    char filename[8];
    // While there's still data left to read from the memory card
    while (fread(buffer, 1, 512, card) == 512)
    {
        // Create JPEGs from the data
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff &&
            (buffer[3] & 0xf0) == 0xe0)
        {
            found_image = 0;
        }

        if (found_image == 0)
        {
            if (counter != 0)
            {
                fclose(img);
            } // close the previous file and start a new file to write (except the first file)

            sprintf(filename, "%03i.jpg", counter);
            img = fopen(filename, "w");
            fwrite(buffer, 1, 512, img);
            counter += 1;
            found_image = 1;
        }
        else if (counter != 0)
        // the block does not contain the signature of jpg, so it will be continuously written into
        // the previously opened file if the first block does not contain the signature, it won't be
        // written to the image
        {
            fwrite(buffer, 1, 512, img);
        }
    }

    // there's nothing to write, so close all the files
    fclose(img);
    fclose(card);
}
```
