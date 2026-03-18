---
title: CS50 Problem Set 8
author: King Hua
pubDatetime: 2026-03-18T11:35:16Z
tags:
  - CS50
description: Answer for CS50 Problem Set 9
---
## Table of contents

# CS50 Problem Set 8
Here's my answers for the CS50 Problem Set 8. Hope that will help you a bit. 
![](https://cdn.jsdelivr.net/gh/kinghua0629/kinghua0629-blog-img/20260318203536655.webp)

## Problem 1: [Trivia](https://cs50.harvard.edu/x/psets/8/trivia/#trivia)
**index.html**
```html
<!DOCTYPE html>

<html lang="en">

    <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
        <link href="styles.css" rel="stylesheet">
        <title>Trivia!</title>
        <script>
            // TODO: Add code to check answers to questions
            function checkMultipleChoices(event) {
                // Get the element which triggered the event
                let button = event.target;

                // Check if the element's inner HTML matches expected answer
                if (button.innerHTML == '1 person per 6 sheep') {
                    button.style.backgroundColor = 'Green';
                    button.parentElement.querySelector('.feedback').innerHTML = 'Correcrt';
                } else {
                    button.style.backgroundColor = 'Red';
                    button.parentElement.querySelector('.feedback').innerHTML = 'Incorrecrt';
                }
            }

            function checkFreeResponse(event) {
                // Get the element which triggered the event
                let button = event.target;

                // Get the input element corresponding to the button
                let input = button.parentElement.querySelector('input');

                //Check if the answer is correct
                if (input.value == 'Switzerland') {
                    input.style.backgroundColor = 'Green';
                    input.parentElement.querySelector('.feedback').innerHTML = 'Correcrt';
                } else {
                    input.style.backgroundColor = 'Red';
                    input.parentElement.querySelector('.feedback').innerHTML = 'Incorrecrt';
                }
            }
        </script>
    </head>

    <body>
        <div class="header">
            <h1>Trivia!</h1>
        </div>

        <div class="container">
            <div class="section">
                <h2>Part 1: Multiple Choice </h2>
                <hr>
                <!-- TODO: Add multiple choice question here -->
                <h3>
                    What is the approximate ratio of people to sheep in New Zealand?
                </h3>
                <button onclick="checkMultipleChoices(event)">6 people per 1 sheep</button>
                <button onclick="checkMultipleChoices(event)">3 people per 1 sheep</button>
                <button onclick="checkMultipleChoices(event)">1 person per 1 sheep</button>
                <button onclick="checkMultipleChoices(event)">1 person per 3 sheep</button>
                <button onclick="checkMultipleChoices(event)">1 person per 6 sheep</button>
                <p class="feedback"></p>
            </div>

            <div class="section">
                <h2>Part 2: Free Response</h2>
                <hr>
                <!-- TODO: Add free response question here -->
                <h3>
                    In which country is it illegal to own only one guinea pig, as a lone guinea pig might get lonely?
                </h3>
                <input type="text" placeholder="Enter text here">
                <button onclick="checkFreeResponse(event)">Check Answer</button>
                <p class="feedback"></p>
            </div>
        </div>
    </body>

</html>
```

## Problem 2: [Homepage](https://cs50.harvard.edu/x/psets/8/homepage/#homepage)
**about.html**
```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>About Me - My Homepage</title>
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
        <!-- Custom CSS -->
        <link href="styles.css" rel="stylesheet">
    </head>

    <body>
        <!-- Navigation Bar -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
            <div class="container">
                <a class="navbar-brand" href="index.html">My Homepage</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="about.html">About Me</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="hobbies.html">Hobbies</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contact.html">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Page Header -->
        <header class="bg-secondary text-white py-5">
            <div class="container text-center">
                <h1 class="display-4">About Me</h1>
                <p class="lead">Get to know me better</p>
            </div>
        </header>

        <!-- Main Content -->
        <main class="container my-5">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <article>
                        <h2 class="mb-4">Hello There!</h2>

                        <section class="mb-5">
                            <h3>Who Am I?</h3>
                            <p>I'm a passionate learner currently working on expanding my web development skills through the CS50 course. This homepage represents my journey into HTML, CSS, and JavaScript development.</p>
                            <p>As someone interested in technology and programming, I enjoy exploring new concepts and applying them to create meaningful projects like this one.</p>
                        </section>

                        <section class="mb-5">
                            <h3>My Background</h3>
                            <p>I have a diverse background with interests spanning multiple fields. While I'm currently focused on computer science and web development, I maintain curiosity about various subjects including:</p>
                            <ul>
                                <li>Computer Science and Programming</li>
                                <li>Formula 1</li>
                                <li>Mathmatics and Physics</li>
                            </ul>
                        </section>

                        <section class="mb-5">
                            <h3>Education & Learning</h3>
                            <p>I'm currently enrolled in Harvard's CS50 course, which has been an incredible learning experience. Through this course, I've gained valuable insights into:</p>
                            <div class="row">
                                <div class="col-md-6">
                                    <ul>
                                        <li>Programming fundamentals</li>
                                        <li>Web development basics</li>
                                        <li>Problem-solving approaches</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <ul>
                                        <li>Algorithm thinking</li>
                                        <li>Code optimization</li>
                                        <li>Project development</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section class="bg-light p-4 rounded">
                            <h3>Fun Facts About Me</h3>
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <div class="p-3">
                                        <h4 class="text-primary">📚</h4>
                                        <p>I love reading books on technology and science</p>
                                    </div>
                                </div>
                                <div class="col-md-4 text-center">
                                    <div class="p-3">
                                        <h4 class="text-primary">🎮</h4>
                                        <p>Enjoy playing strategy games in my free time</p>
                                    </div>
                                </div>
                                <div class="col-md-4 text-center">
                                    <div class="p-3">
                                        <h4 class="text-primary">☕</h4>
                                        <p>Believe that good coffee fuels great ideas</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-dark text-white py-4 mt-5">
            <div class="container text-center">
                <p>2026 My Homepage.</p>
            </div>
        </footer>

        <!-- Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        <!-- Custom JavaScript -->
        <script src="script.js"></script>
    </body>

</html>
```
**contact.html**
```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Me - My Homepage</title>
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
        <!-- Custom CSS -->
        <link href="styles.css" rel="stylesheet">
    </head>

    <body>
        <!-- Navigation Bar -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
            <div class="container">
                <a class="navbar-brand" href="index.html">My Homepage</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">About Me</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="hobbies.html">Hobbies</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="contact.html">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Page Header -->
        <header class="bg-warning text-dark py-5">
            <div class="container text-center">
                <h1 class="display-4">Get In Touch</h1>
                <p class="lead">Feel free to reach out for any inquiries or collaborations</p>
            </div>
        </header>

        <!-- Main Content -->
        <main class="container my-5">
            <div class="row">
                <!-- Contact Form -->
                <div class="col-lg-6 mb-5">
                    <div class="card shadow">
                        <div class="card-header bg-primary text-white">
                            <h3 class="mb-0">Send Me a Message</h3>
                        </div>
                        <div class="card-body">
                            <form id="contactForm">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name *</label>
                                    <input type="text" class="form-control" id="name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email *</label>
                                    <input type="email" class="form-control" id="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="subject" class="form-label">Subject</label>
                                    <input type="text" class="form-control" id="subject">
                                </div>
                                <div class="mb-3">
                                    <label for="message" class="form-label">Message *</label>
                                    <textarea class="form-control" id="message" rows="5" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Send Message</button>
                                <button type="reset" class="btn btn-outline-secondary ms-2">Clear Form</button>
                            </form>
                            <div id="formSuccess" class="alert alert-success mt-3 d-none">
                                Thank you for your message! I'll get back to you soon.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Information -->
                <div class="col-lg-6">
                    <div class="card shadow">
                        <div class="card-header bg-success text-white">
                            <h3 class="mb-0">Contact Information</h3>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <strong>📧 Email:</strong>
                                    <a href="mailto:kinghua0629@outlook.com" class="text-decoration-none">kinghua0629@outlook.com</a>
                                </li>
                                <li class="list-group-item">
                                    <strong>🌐 Website:</strong>
                                    <a href="https://kinghua0629.github.io" target="_blank" class="text-decoration-none">kinghua0629.github.io</a>
                                </li>
                                <li class="list-group-item">
                                    <strong>📍 Location:</strong> Shanghai, China
                                </li>
                                <li class="list-group-item">
                                    <strong>🕒 Availability:</strong> Usually responsive during business hours
                                </li>
                            </ul>

                            <div class="mt-4">
                                <h5>Social Links</h5>
                                <div class="d-flex gap-2">
                                    <a href="https://github.com/kinghua0629" class="btn btn-outline-primary">GitHub</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- FAQ Section -->
                    <div class="card mt-4 shadow">
                        <div class="card-header bg-info text-white">
                            <h3 class="mb-0">Frequently Asked Questions</h3>
                        </div>
                        <div class="card-body">
                            <div class="accordion" id="faqAccordion">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="faqHeading1">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse1">
                                            How long does it take to get a response?
                                        </button>
                                    </h2>
                                    <div id="faqCollapse1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                        <div class="accordion-body">
                                            I typically respond to emails within 24 hours during weekdays.
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="faqHeading2">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse2">
                                            Do you accept collaboration requests?
                                        </button>
                                    </h2>
                                    <div id="faqCollapse2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div class="accordion-body">
                                            Yes! I'm always interested in interesting projects and collaborations. Feel free to describe your idea in the message.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-dark text-white py-4 mt-5">
            <div class="container text-center">
                <p>&copy; 2026 My Homepage.</p>
            </div>
        </footer>

        <!-- Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        <!-- Custom JavaScript -->
        <script src="script.js"></script>
    </body>

</html>
```
**hobbies.html**
```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Hobbies - My Homepage</title>
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
        <!-- Custom CSS -->
        <link href="styles.css" rel="stylesheet">
    </head>

    <body>
        <!-- Navigation Bar -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
            <div class="container">
                <a class="navbar-brand" href="index.html">My Homepage</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">About Me</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="hobbies.html">Hobbies</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contact.html">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Page Header -->
        <header class="bg-success text-white py-5">
            <div class="container text-center">
                <h1 class="display-4">My Hobbies & Interests</h1>
                <p class="lead">Things I enjoy doing in my spare time</p>
            </div>
        </header>

        <!-- Main Content -->
        <main class="container my-5">
            <!-- Hobbies Gallery -->
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title text-success">💻 Programming</h5>
                            <p class="card-text">I love solving problems through code and building applications. Currently learning web development through CS50.</p>
                            <div class="progress">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 75%">75%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title text-primary">📖 Reading</h5>
                            <p class="card-text">Passionate about books on technology, science fiction, and personal development. Always looking for new recommendations.</p>
                            <div class="progress">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: 70%">70%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title text-warning">🎮 Gaming</h5>
                            <p class="card-text">Enjoy strategy games and puzzles. Love the problem-solving aspect and competitive elements.</p>
                            <div class="progress">
                                <div class="progress-bar bg-warning" role="progressbar" style="width: 50%">50%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Skills Section -->
            <div class="row mt-5">
                <div class="col-lg-8 mx-auto">
                    <h2 class="text-center mb-4">Skills & Interests</h2>
                    <div class="accordion" id="skillsAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                    🎯 Problem Solving
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#skillsAccordion">
                                <div class="accordion-body">
                                    I enjoy tackling complex problems and finding creative solutions. This skill translates well to both programming and everyday challenges.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                    🎨 Creative Design
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#skillsAccordion">
                                <div class="accordion-body">
                                    Interested in UI/UX design and creating visually appealing interfaces. Always looking to improve the aesthetic aspects of my projects.
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                    📚 Continuous Learning
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#skillsAccordion">
                                <div class="accordion-body">
                                    Committed to lifelong learning and staying updated with new technologies and methodologies in the ever-evolving tech landscape.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Interactive Hobby Selector -->
            <div class="row mt-5">
                <div class="col-lg-6 mx-auto">
                    <div class="bg-info text-white p-4 rounded text-center">
                        <h3>What's Your Favorite Hobby?</h3>
                        <div class="mt-3">
                            <select id="hobbySelect" class="form-select">
                                <option value="">Choose a hobby...</option>
                                <option value="programming">Programming/Coding</option>
                                <option value="reading">Reading</option>
                                <option value="gaming">Gaming</option>
                                <option value="music">Music</option>
                                <option value="sports">Sports</option>
                                <option value="travel">Traveling</option>
                            </select>
                            <button id="hobbySubmit" class="btn btn-light mt-2">Share Your Choice</button>
                            <p id="hobbyResponse" class="mt-3"></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-dark text-white py-4 mt-5">
            <div class="container text-center">
                <p>2026 My Homepage.</p>
            </div>
        </footer>

        <!-- Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        <!-- Custom JavaScript -->
        <script src="script.js"></script>
    </body>

</html>
```
**index.html**
```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        <link href="styles.css" rel="stylesheet">
        <title>Welcome to My Homepage</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body>
        <!-- Navigation Bar -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
            <div class="container">
                <a class="navbar-brand" href="index.html">My Homepage</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link active" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">About Me</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="hobbies.html">Hobbies</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contact.html">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <header class="bg-light py-5">
            <div class="container text-center">
                <h1 class="display-4 fw-bold">Welcome to My Personal Homepage!</h1>
                <p class="lead">This is my CS50 homepage assignment showcasing HTML, CSS, and JavaScript skills.</p>
                <button id="welcomeBtn" class="btn btn-primary btn-lg mt-3">Click for a Surprise!</button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="container my-5">
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body text-center">
                            <h3 class="card-title">About Me</h3>
                            <p class="card-text">Learn more about who I am and my background.</p>
                            <a href="about.html" class="btn btn-outline-primary">View Details</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body text-center">
                            <h3 class="card-title">My Hobbies</h3>
                            <p class="card-text">Discover my interests and favorite activities.</p>
                            <a href="hobbies.html" class="btn btn-outline-primary">Explore Hobbies</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body text-center">
                            <h3 class="card-title">Get in Touch</h3>
                            <p class="card-text">Feel free to contact me for any inquiries.</p>
                            <a href="contact.html" class="btn btn-outline-primary">Contact Me</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Interactive Section -->
            <div class="row mt-5">
                <div class="col-12">
                    <div class="bg-primary text-white p-4 rounded">
                        <h2 class="text-center mb-4">Interactive Demo</h2>
                        <div class="text-center">
                            <button id="colorChangeBtn" class="btn btn-light me-2">Change Background Color</button>
                            <button id="showTimeBtn" class="btn btn-light">Show Current Time</button>
                            <p id="timeDisplay" class="mt-3 fs-5"></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-dark text-white py-4 mt-5">
            <div class="container text-center">
                <p>2026 My Homepage</p>
            </div>
        </footer>

        <!-- Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        <!-- Custom JavaScript -->
        <script src="script.js"></script>
    </body>

</html>
```
**script.js**
```javascript
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Welcome button functionality
    const welcomeBtn = document.getElementById('welcomeBtn');
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', function() {
            alert('🎉 Welcome to my homepage! Thanks for visiting! 🎉');
        });
    }

    // Color changing functionality
    const colorChangeBtn = document.getElementById('colorChangeBtn');
    if (colorChangeBtn) {
        colorChangeBtn.addEventListener('click', function() {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.backgroundColor = randomColor;

            // Add temporary notification
            showNotification(`Background changed to ${randomColor}`, 'success');
        });
    }

    // Show current time functionality
    const showTimeBtn = document.getElementById('showTimeBtn');
    const timeDisplay = document.getElementById('timeDisplay');
    if (showTimeBtn && timeDisplay) {
        showTimeBtn.addEventListener('click', function() {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            timeDisplay.textContent = `Current time: ${timeString}`;
            timeDisplay.classList.add('fade-in');

            // Remove animation class after animation completes
            setTimeout(() => {
                timeDisplay.classList.remove('fade-in');
            }, 600);
        });
    }

    // Hobby selector functionality
    const hobbySelect = document.getElementById('hobbySelect');
    const hobbySubmit = document.getElementById('hobbySubmit');
    const hobbyResponse = document.getElementById('hobbyResponse');
    if (hobbySelect && hobbySubmit && hobbyResponse) {
        hobbySubmit.addEventListener('click', function() {
            const selectedHobby = hobbySelect.value;
            if (selectedHobby) {
                const responses = {
                    'programming': 'Great choice! Programming opens up endless possibilities.',
                    'reading': 'Wonderful! Reading expands our minds and knowledge.',
                    'gaming': 'Awesome! Games develop strategic thinking skills.',
                    'music': 'Fantastic! Music is truly universal language.',
                    'sports': 'Excellent! Sports promote health and teamwork.',
                    'travel': 'Amazing! Travel broadens our perspectives.'
                };

                hobbyResponse.textContent = responses[selectedHobby] || 'That sounds interesting!';
                hobbyResponse.className = 'mt-3 alert alert-info';
            } else {
                hobbyResponse.textContent = 'Please select a hobby first!';
                hobbyResponse.className = 'mt-3 alert alert-warning';
            }
        });
    }

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name && email && message) {
                // Simulate form submission
                showLoadingState(contactForm);

                setTimeout(() => {
                    hideLoadingState(contactForm);
                    formSuccess.classList.remove('d-none');
                    contactForm.reset();

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.add('d-none');
                    }, 5000);
                }, 1500);
            } else {
                showNotification('Please fill in all required fields!', 'warning');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // Dynamic greeting based on time of day
    const greetingElement = document.querySelector('header h1');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = '';

        if (hour < 12) {
            greeting = 'Good Morning';
        } else if (hour < 18) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }

        // Update greeting with smooth transition
        setTimeout(() => {
            greetingElement.textContent = `${greeting}! Welcome to My Personal Homepage!`;
        }, 1000);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'H' to go home
        if (e.key === 'h' || e.key === 'H') {
            window.location.href = 'index.html';
        }
        // Press 'A' for about
        if (e.key === 'a' || e.key === 'A') {
            window.location.href = 'about.html';
        }
        // Press 'C' for contact
        if (e.key === 'c' || e.key === 'C') {
            window.location.href = 'contact.html';
        }
    });

    // Session storage for user preferences
    if (typeof(Storage) !== "undefined") {
        // Store visit count
        let visitCount = sessionStorage.getItem('visitCount') || 0;
        visitCount++;
        sessionStorage.setItem('visitCount', visitCount);

        // Show welcome back message for returning visitors
        if (visitCount > 1) {
            setTimeout(() => {
                showNotification(`Welcome back! This is your visit #${visitCount}`, 'info');
            }, 2000);
        }
    }

    // Console message for developers
    console.log('%c👋 Hello Developer!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cThis site was built with HTML, CSS, Bootstrap, and JavaScript for CS50 assignment.', 'color: #333; font-size: 14px;');
});

// Helper Functions

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 1000;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
    submitBtn.disabled = true;

    // Store original text for later restoration
    submitBtn.dataset.originalText = originalText;
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = submitBtn.dataset.originalText || 'Send Message';
    submitBtn.disabled = false;
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible
        document.title = 'Welcome Back! - My Homepage';
    } else {
        // Page hidden
        document.title = 'Come Back Soon! - My Homepage';
    }
});
```
**specification.txt**
```
HTML Tags Used (10+ distinct tags):
1. <!DOCTYPE> - Defines the document type
2. <html> - Root element of the HTML document
3. <head> - Contains meta information and links
4. <meta> - Provides metadata about the HTML document
5. <title> - Sets the title of the webpage
6. <link> - Links external resources like CSS and Bootstrap
7. <script> - Includes JavaScript files
8. <body> - Contains the visible page content
9. <nav> - Navigation section with Bootstrap navbar
10. <header> - Introductory content or navigation aids
11. <main> - Main content area of the document
12. <section> - Generic section of content
13. <article> - Independent, self-contained content
14. <div> - Generic container for flow content
15. <span> - Inline container for phrasing content
16. <p> - Paragraph element
17. <h1>, <h2>, <h3>, <h4>, <h5> - Heading elements
18. <ul>, <ol> - Unordered and ordered lists
19. <li> - List items
20. <a> - Anchor element for hyperlinks
21. <img> - Image element
22. <button> - Clickable button
23. <form> - Form for user input
24. <input> - Input field
25. <textarea> - Multi-line text input
26. <select> - Drop-down list
27. <option> - Options in a drop-down list
28. <label> - Label for form elements
29. <footer> - Footer section of the document

CSS Properties Used (5+ distinct properties):
1. font-family - Sets the font family for text
2. background - Sets background colors and gradients
3. color - Sets text color
4. margin - Sets margins around elements
5. padding - Sets padding inside elements
6. border-radius - Rounds corners of elements
7. box-shadow - Adds shadow effects to elements
8. transition - Animates property changes
9. transform - Applies 2D/3D transformations
10. display - Specifies display behavior of elements
11. position - Specifies positioning method
12. z-index - Controls stacking order of elements
13. width - Sets element width
14. height - Sets element height
15. text-shadow - Adds shadow to text

JavaScript Features Used:
I integrated multiple JavaScript features to make the site interactive:
1. DOM manipulation - Dynamically changing page content and styles
2. Event listeners - Handling user interactions like clicks and form submissions
3. Alert dialogs - Showing popup notifications and welcome messages
4. Dynamic content generation - Creating elements and updating text content
5. Form validation - Checking user input before submission
6. Animation effects - Adding CSS classes for smooth transitions
7. Local storage - Storing visitor count using session storage
8. Intersection Observer API - Creating fade-in effects for elements
9. Keyboard event handling - Adding keyboard shortcuts (H, A, C keys)
10. Page visibility API - Changing page title based on tab visibility
11. Timed functions - Using setTimeout for delayed actions and auto-hiding elements
12. Console logging - Providing developer information in browser console

Bootstrap Integration:
I incorporated Bootstrap 5.3.8 throughout the site for responsive design:
1. Grid system - Using container, row, and col classes for responsive layouts
2. Components - Navbar, cards, buttons, forms, accordions, progress bars
3. Utilities - Spacing, colors, shadows, and responsive utilities
4. JavaScript plugins - Modal, tooltip, and collapse functionality
5. Responsive breakpoints - Automatic adaptation to different screen sizes

Responsive Design:
The site is fully responsive and works well on:
- Mobile devices (phones)
- Tablets
- Laptops/desktops
- Various screen sizes and orientations
```
**style.css**
```css
/* Body style */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Navigation bar style */
.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
}

.nav-link:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
}

/* Header/Hero Section Styling */
header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

header h1 {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Card Hover Effects */
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* Button Animations */
.btn {
    transition: all 0.3s ease;
}

.btn:hover {
    transform: scale(1.05);
}

/* Progress Bar Customization */
.progress {
    height: 10px;
    border-radius: 5px;
}

.progress-bar {
    transition: width 1s ease-in-out;
}

/* Form Styling */
.form-control:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

/* Accordion Customization */
.accordion-button:not(.collapsed) {
    background-color: #e7f1ff;
    color: #0c63e4;
}

/* Footer Styling */
footer {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

/* Responsive Typography */
@media (max-width: 768px) {
    .display-4 {
        font-size: 2.5rem;
    }

    .lead {
        font-size: 1.1rem;
    }
}

/* Mobile-Specific Adjustments */
@media (max-width: 576px) {
    .navbar-brand {
        font-size: 1.2rem;
    }

    .card {
        margin-bottom: 1rem;
    }

    .btn {
        width: 100%;
        margin-bottom: 0.5rem;
    }
}

/* Animation Classes */
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}

/* Custom Utility Classes */
.text-shadow {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.bg-gradient-custom {
    background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
}

.border-radius-lg {
    border-radius: 15px;
}

.shadow-soft {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Interactive Elements */
.interactive-element {
    cursor: pointer;
    user-select: none;
}

.interactive-element:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

/* Loading Spinner */
.loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Alert Customization */
.alert-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
}

.alert-warning {
    background-color: #fff3cd;
    border-color: #ffeaa7;
    color: #856404;
}

/* List Group Customization */
.list-group-item:hover {
    background-color: #f8f9fa;
    transition: background-color 0.2s ease;
}

/* Scroll Behavior */
html {
    scroll-behavior: smooth;
}

/* Focus Styles for Accessibility */
.btn:focus,
.form-control:focus,
.nav-link:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}
```
