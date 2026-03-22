---
title: CS50 Problem Set 7
author: King Hua
pubDatetime: 2026-03-18T11:33:16Z
tags:
  - CS50
description: Answer for CS50 Problem Set 7
---

## Table of contents

# CS50 Problem Set 7

Here's my answer for the CS50 Problem Set 7. Hope that will help you a bit.
![](https://cdn.jsdelivr.net/gh/kinghua0629/kinghua0629-blog-img/20260318203536655.webp)

## Problem 1: [Songs](https://cs50.harvard.edu/x/psets/7/songs/#songs)

```sql file=1.sql
SELECT name FROM songs;
```

```sql file=2.sql
SELECT name
FROM songs
ORDER BY tempo;
```

```sql file=3.sql
SELECT name
FROM songs
ORDER BY duration_ms DESC
LIMIT 5;
```

```sql file=4.sql
SELECT name
FROM songs
WHERE danceability > 0.75 AND energy > 0.75 AND valence > 0.75;
```

```sql file=5.sql
SELECT AVG(energy)
FROM songs;
```

```sql file=6.sql
SELECT name
FROM songs
WHERE artist_id = (
    SELECT id
    FROM artists
    WHERE name = 'Post Malone'
);
```

```sql file=7.sql
SELECT AVG(energy)
FROM songs
WHERE artist_id = (
    SELECT id
    FROM artists
    WHERE name = 'Drake'
);
```

```sql file=8.sql
SELECT name
FROM songs
WHERE name LIKE '%feat.%';
```

```txt file=answers.txt
1. I will use the SQL to count the average energy, valence, and danceability of a person’s top 100 songs from the past year.

2. I should consider how many times they listen to each music.
```

## Problem 2: [Movies](https://cs50.harvard.edu/x/psets/7/movies/#movies)

```sql file=1.sql
-- 1. Titles of all movies from 2008
SELECT title
FROM movies
WHERE year = 2008;
```

```sql file=2.sql
-- 2. Birth year of Emma Stone
SELECT birth
FROM people
WHERE name = 'Emma Stone';
```

```sql file=3.sql
-- 3. Titles of all movies since 2018, in alphabetical order
SELECT title
FROM movies
WHERE year >= 2018
ORDER BY title ASC;
```

```sql file=4.sql
-- 4. Number of movies with a 10.0 rating
SELECT COUNT(rating)
FROM ratings
WHERE rating = 10.0
```

```sql file=5.sql
-- 5. Titles and years of all Harry Potter movies, in chronological order (title beginning with "Harry Potter and the ...")
SELECT title, year
FROM movies
WHERE title LIKE "Harry Potter and the%"
ORDER BY year;
```

```sql file=6.sql
-- 6. Average rating of movies in 2012
SELECT AVG(rating)
FROM ratings
WHERE movie_id IN (
    SELECT id FROM movies WHERE year = 2012
)
```

```sql file=7.sql
-- 7. All movies and ratings from 2010, in decreasing order by rating (alphabetical for those with same rating)
SELECT movies.title, ratings.rating
FROM movies
JOIN ratings
ON movies.id = ratings.movie_id AND movies.year = 2010 AND ratings.rating > 0
ORDER BY ratings.rating DESC, title ASC;
```

```sql file=8.sql
-- 8. Names of people who starred in Toy Story
SELECT name
FROM people
WHERE id IN(
    SELECT person_id
    FROM stars
    WHERE movie_id = (
        SELECT id
        FROM movies
        WHERE title = 'Toy Story'
    )
);
```

```sql file=9.sql
-- 9. Names of all people who starred in a movie released in 2004, ordered by birth year
SELECT id, name
FROM people
WHERE id IN(
    SELECT person_id
    FROM stars
    WHERE movie_id IN(
        SELECT id
        FROM movies
        WHERE year = 2004
    )
)
ORDER BY birth;
```

```sql file=10.sql
-- 10. Names of all directors who have directed a movie that got a rating of at least 9.0
SELECT name
FROM people
WHERE id IN (
    SELECT person_id
    FROM directors
    WHERE movie_id IN (
        SELECT movie_id
        FROM ratings
        WHERE rating >= 9.0
    )
);
```

```sql file=11.sql
-- 11. Titles of the five highest rated movies (in order) that Chadwick Boseman starred in, starting with the highest rated
SELECT title
FROM movies
JOIN ratings ON ratings.movie_id = movies.id
WHERE id IN (
    SELECT movie_id
    FROM stars
    WHERE person_id = (
        SELECT id
        FROM people
        WHERE name = 'Chadwick Boseman'
    )
)
ORDER BY ratings.rating DESC
LIMIT 5;
```

```sql file=12.sql
-- 12. Titles of all of movies in which both Jennifer Lawrence and Bradley Cooper starred
SELECT title
FROM movies
WHERE (
    id IN (
    SELECT movie_id
    FROM stars
    WHERE person_id IN (
        SELECT id
        FROM people
        WHERE name = 'Bradley Cooper'
        )
    )
)
AND (
    id IN (
    SELECT movie_id
    FROM stars
    WHERE person_id IN (
        SELECT id
        FROM people
        WHERE name = 'Jennifer Lawrence'
        )
    )
);
```

```sql file=13.sql
-- 13. Names of all people who starred in a movie in which Kevin Bacon also starred
SELECT name
FROM people
JOIN stars ON people.id = stars.person_id
JOIN movies ON movies.id = stars.movie_id
WHERE movies.id IN (
    SELECT movies.id
    FROM movies
    JOIN stars ON movies.id = stars.movie_id
    JOIN people ON stars.person_id = people.id
    WHERE people.name = 'Kevin Bacon' AND people.birth = 1958
)
AND people.name != 'Kevin Bacon';
```

## Problem 3: [Fiftyville](https://cs50.harvard.edu/x/psets/7/fiftyville/#fiftyville)

```txt file=answers.txt
The THIEF is: Bruce
The city the thief ESCAPED TO: New York City
The ACCOMPLICE is: Robin
```

```sql file=log.sql
-- Keep a log of any SQL queries you execute as you solve the mystery.
-- Get the description of the crime scene reports on that day and the street
SELECT description FROM crime_scene_reports
    WHERE year = 2025 AND month = 7 AND day = 28 AND street = 'Humphrey Street';
-- Theft of the CS50 duck took place at 10:15am at the Humphrey Street bakery. Interviews were conducted today with three witnesses who were present at the time – each of their interview transcripts mentions the bakery.
-- Littering took place at 16:36. No known witnesses.

--Get the transcript from the reporters
SELECT transcript FROM interviews WHERE year = 2025 AND month = 7 AND day = 28 AND transcript LIKE "%bakery%";
-- Sometime within ten minutes of the theft, I saw the thief get into a car in the bakery parking lot and drive away. If you have security footage from the bakery parking lot, you might want to look for cars that left the parking lot in that time frame.
-- I don't know the thief's name, but it was someone I recognized. Earlier this morning, before I arrived at Emma's bakery, I was walking by the ATM on Leggett Street and saw the thief there withdrawing some money.
-- As the thief was leaving the bakery, they called someone who talked to them for less than a minute. In the call, I heard the thief say that they were planning to take the earliest flight out of Fiftyville tomorrow. The thief then asked the person on the other end of the phone to purchase the flight ticket.

SELECT bakery_security_logs.activity, bakery_security_logs.license_plate, people.name FROM bakery_security_logs
JOIN people ON bakery_security_logs.license_plate = people.license_plate
WHERE bakery_security_logs.year = 2025
AND bakery_security_logs.month = 7
AND bakery_security_logs.day = 28
AND bakery_security_logs.hour = 10
AND bakery_security_logs.minute >= 15
AND bakery_security_logs.minute <= 25;
/*
+----------+---------------+---------+
| activity | license_plate |  name   |
+----------+---------------+---------+
| exit     | 5P2BI95       | Vanessa |
| exit     | 94KL13X       | Bruce   | *
| exit     | 6P58WS2       | Barry   |
| exit     | 4328GD8       | Luca    |
| exit     | G412CB7       | Sofia   |
| exit     | L93JTIZ       | Iman    |
| exit     | 322W7JE       | Diana   | *
| exit     | 0NTHK55       | Kelsey  |
+----------+---------------+---------+
*/

SELECT people.name FROM people
JOIN bank_accounts ON bank_accounts.person_id = people.id
JOIN atm_transactions ON atm_transactions.account_number = bank_accounts.account_number
WHERE atm_transactions.year = 2025
AND atm_transactions.month = 7
AND atm_transactions.day = 28
AND atm_transactions.atm_location = 'Leggett Street'
AND atm_transactions.transaction_type = 'withdraw';
/*
+---------+
|  name   |
+---------+
| Bruce   | *
| Diana   | *
| Brooke  |
| Kenny   |
| Iman    |
| Luca    |
| Taylor  |
| Benista |
+---------+
*/

UPDATE phone_calls
SET receiver = people.name
FROM people
WHERE phone_calls.receiver = people.phone_number;

UPDATE phone_calls
SET caller = people.name
FROM people
WHERE phone_calls.caller = people.phone_number;

SELECT caller, receiver FROM phone_calls
WHERE year = 2025
AND month = 7
AND day = 28
AND duration < 60;
/*
+---------+------------+
| caller  |  receiver  |
+---------+------------+
| Sofia   | Jack       |
| Kelsey  | Larry      |
| Bruce   | Robin      | *
| Kelsey  | Melissa    |
| Taylor  | James      |
| Diana   | Philip     | *
| Carina  | Jacqueline |
| Kenny   | Doris      |
| Benista | Anna       |
+---------+------------+
*/

SELECT id, origin_airport_id, destination_airport_id FROM flights
WHERE year = 2025
AND month = 7
AND day = 29
AND origin_airport_id = (
    SELECT id FROM airports
    WHERE city = 'Fiftyville'
)
ORDER BY flights.hour ASC;
/*
+----+-------------------+------------------------+
| id | origin_airport_id | destination_airport_id |
+----+-------------------+------------------------+
| 36 | 8                 | 4                      | *
| 43 | 8                 | 1                      |
| 23 | 8                 | 11                     |
| 53 | 8                 | 9                      |
| 18 | 8                 | 6                      |
+----+-------------------+------------------------+
*/

SELECT city FROM airports
WHERE id = 4;
/*
+---------------+
|     city      |
+---------------+
| New York City |
+---------------+
*/

SELECT name FROM people
WHERE people.passport_number IN (
    SELECT passengers.passport_number from passengers
    WHERE flight_id = 36
);
/*
+--------+
|  name  |
+--------+
| Kenny  |
| Sofia  |
| Taylor |
| Luca   |
| Kelsey |
| Edward |
| Bruce  | *
| Doris  |
+--------+
*/
```
