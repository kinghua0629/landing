---
title: CS50 Problem Set 9
author: King Hua
pubDatetime: 2026-03-18T11:37:16Z
tags:
  - CS50
description: Answer for CS50 Problem Set 9
---

## Table of contents

# CS50 Problem Set 9

Here's my answers for the CS50 Problem Set 9. Hope that will help you a bit.
![](https://cdn.jsdelivr.net/gh/kinghua0629/kinghua0629-blog-img/20260318203536655.webp)

## Problem 1: [Birthdays](https://cs50.harvard.edu/x/2026/psets/9/birthdays/#birthdays)

```html file=index.html
<!DOCTYPE html>

<html lang="en">

    <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        <title>Birthdays</title>
    </head>

    <body>
        <div class="header">
            <h1>Birthdays</h1>
        </div>
        <div class="container">
            <div class="section">

                <h2>Add a Birthday</h2>
                <!-- TODO: Create a form for users to submit a name, a month, and a day -->
                <!-- With {action="/" method ="post"}, the form can send data back to the server, and meet the requirement {request.method == "POST"} in app.py-->
                <form action="/" method="post">
                    <input name="name" placeholder="Name" autofocus autocomplete="off" type="text" min="1" max="12">
                    <input name="month" placeholder="Month" autocomplete="off" type="number" min="1" max="31">
                    <input name="day" placeholder="Day" autocomplete="off" type="number">
                    <input type="submit" value="Add Birthday">
                </form>


            </div>

            <div class="section">

                <h2>All Birthdays</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birthday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- TODO: Loop through the database entries to display them in this table -->
                        {% for birthday in birthdays %}
                            <tr>
                                <td>{{ birthday["name"] }}</td>
                                <td>{{ birthday["month"] }}/{{ birthday["day"] }}</td>
                            </tr>
                        {% endfor %}
                    </tbody>
                </table>
            </div>
        </div>
    </body>

</html>
```

```python file=app.py
import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///birthdays.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":

        # TODO: Add the user's entry into the database
        name = request.form.get("name")
        if not name:
            return redirect("/")

        month = request.form.get("month")
        if not month:
            return redirect("/")

        day = request.form.get("day")
        if not day:
            return redirect("/")

        db.execute("INSERT INTO birthdays (name, month, day) VALUES(?, ?, ?)", name, month, day)

        return redirect("/")

    else:

        # TODO: Display the entries in the database on index.html
        birthdays = db.execute("SELECT * FROM birthdays")

        return render_template("index.html", birthdays=birthdays)
```

## Problem 2: [Finance](https://cs50.harvard.edu/x/psets/9/finance/#c50-finance)

```python file=app.py
import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    # select user's portfolio and cash
    rows = db.execute("SELECT * FROM portfolio WHERE userid = ?", session["user_id"])
    cash_result = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])

    # get cash value
    cash = cash_result[0]['cash']

    # intilize sum = cash
    sum = cash

    for row in rows:
        stock_info = lookup(row['symbol'])
        if stock_info is None:
            continue  # Skip if stock info not available
        row['name'] = stock_info['name']

        # Ensure price is numeric before calculations (handles string prices from API)
        try:
            price_numeric = float(stock_info['price'])
        except (ValueError, TypeError):
            continue  # Skip if price is not a valid number

        row['price'] = price_numeric
        row['total'] = price_numeric * row['shares']
        sum = sum + row['total']

        # Format price and total as USD for display (don't modify original numeric values)
        row['price_usd'] = usd(price_numeric)
        row['total_usd'] = usd(row['total'])

    return render_template("index.html", rows=rows, cash=usd(cash), sum=usd(sum))


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    # if the method is GET, display buy.html to the user
    if request.method == "GET":
        return render_template("buy.html")

    # if the method is POST
    else:
        symbol = request.form.get("symbol")
        shares = request.form.get("shares")
        quote = lookup(symbol)

        if not symbol:
            return apology("Please provide a stock symbol!", 400)

        if not shares:
            return apology("Please provide number of shares!", 400)

        if quote == None:
            return apology("Invalid stock symbol!", 400)

        # validate shares: must be a positive integer
        try:
            shares = float(shares)
            if shares != int(shares):
                return apology("Shares must be a whole number (no fractions)!", 400)
            shares = int(shares)
            if shares <= 0:
                return apology("Shares must be a positive number!", 400)
        except (ValueError, TypeError):
            return apology("Shares must be a numeric value!", 400)

        # calculate the purchase
        symbol = symbol.upper()
        # Ensure quote['price'] is a number for calculations
        try:
            price = float(quote['price'])
        except (ValueError, TypeError):
            return apology("Invalid stock price data!", 400)

        purchase = price * shares

        # get the balance
        balance_result = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])
        balance = balance_result[0]['cash']

        # calculate the remainder
        remainder = balance - purchase

        if remainder < 0:
            return apology("Insufficient money!", 400)

        # update the database
        db.execute("UPDATE users SET cash = ? WHERE id = ?", remainder, session["user_id"])

        # check if user already owns this stock
        existing = db.execute("SELECT shares FROM portfolio WHERE userid = ? AND symbol = ?",
                              session["user_id"], symbol)

        if existing:
            # update existing position
            old_shares = existing[0]['shares']
            new_shares = old_shares + shares
            db.execute("UPDATE portfolio SET shares = ? WHERE userid = ? AND symbol = ?",
                       new_shares, session["user_id"], symbol)
        else:
            # create new position
            db.execute("INSERT INTO portfolio (userid, symbol, shares) VALUES (?, ?, ?)",
                       session["user_id"], symbol, shares)

        # update history
        db.execute("INSERT INTO history (userid, symbol, shares, method, price) VALUES (?, ?, ?, ?, ?)",
                   session["user_id"], symbol, shares, 'Buy', price)

        flash(f"Bought {shares} shares of {symbol} costing {usd(purchase)}")
        return redirect("/")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""

    rows = db.execute("SELECT * FROM history WHERE userid = ?", session["user_id"])

    return render_template("history.html", rows=rows)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        username = request.form.get("username")
        if not username:
            return apology("must provide username", 403)

        # Ensure password was submitted
        password = request.form.get("password")
        if not password:
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", username
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], password
        ):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""

    # if GET received, send quote.html to the user
    if request.method == "GET":
        return render_template("quote.html")

    else:

        # lookup in the database
        symbol = lookup(request.form.get("symbol"))

        if symbol == None:
            return apology("invalid stock symbol", 400)
        else:
            return render_template("quoted.html", symbol=symbol)


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    # clear previous session
    session.clear()

    # submit the register form
    if request.method == "POST":

        # check whether the username exists
        if not request.form.get("username"):
            return apology("Username is required!", 400)

        # check whether the password exists
        elif not request.form.get("password"):
            return apology("Password is required!", 400)

        # check whether the confirmation exists
        elif not request.form.get("confirmation"):
            return apology("Confirmation is required!", 400)

        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        if not password or not confirmation:
            return apology("Password fields cannot be empty!", 400)

        # check whether the password is the same as confirmation
        if password != confirmation:
            return apology("Passwords do not match!", 400)

        # save the username, and hash the password
        username = request.form.get("username")
        hash = generate_password_hash(password)

        # check if the username has been taken
        rows = db.execute("SELECT * FROM users WHERE username = ?", username)
        if len(rows) != 0:
            return apology("Username already exists!", 400)

        # insert username and hash into database
        db.execute("INSERT INTO users (username, hash) VALUES (?, ?)", username, hash)

        # create new session for the user
        id = db.execute("SELECT id FROM users WHERE username = ?", username)
        session["user_id"] = id[0]["id"]

        # redirect to login page
        return redirect("/login")

    else:
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""

    # if method=GET, send sell.html to the user
    if request.method == "GET":
        # get the user's current stock
        portfolio = db.execute("SELECT symbol FROM portfolio WHERE userid = ?", session["user_id"])
        return render_template("sell.html", portfolio=portfolio)

    # if method=POST, sell stocks
    else:
        # Save stock symbol, number of shares, and quote dict from form
        symbol = request.form.get("symbol")
        shares = request.form.get("shares")

        # check for symbol
        if not symbol:
            return apology("Must provide valid stock symbol!", 400)

        quote = lookup(symbol)
        if quote is None:
            return apology("Invalid stock symbol!", 400)

        rows = db.execute("SELECT * FROM portfolio WHERE userid = ? AND symbol = ?",
                          session["user_id"], symbol.upper())

        # check for errors
        if len(rows) != 1:
            return apology("Must provide valid stock symbol!", 400)
        if not shares:
            return apology("Must provide number of shares!", 400)

        # validate shares: must be a positive integer
        try:
            shares = float(shares)
            if shares != int(shares):
                return apology("Shares must be a whole number (no fractions)!", 400)
            shares = int(shares)
            if shares <= 0:
                return apology("Shares must be a positive number!", 400)
        except (ValueError, TypeError):
            return apology("Shares must be a numeric value!", 400)

        # get the old shares
        oldshares = rows[0]['shares']

        # check for errors
        if shares > oldshares:
            return apology("Shares sold can't exceed shares owned", 400)

        # calculate sold money
        # Ensure quote['price'] is a number for calculations
        try:
            price = float(quote['price'])
        except (ValueError, TypeError):
            return apology("Invalid stock price data!", 400)

        sold = price * shares

        # get the current cash of the user
        cash_result = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])
        cash = cash_result[0]['cash']

        # calculate the new amount of cash
        cash = cash + sold

        # update the database
        db.execute("UPDATE users SET cash = ? WHERE id = ?", cash, session["user_id"])

        # calcualte new shares
        newshares = oldshares - shares

        # if there's shares remain, update portfolio
        if newshares > 0:
            db.execute("UPDATE portfolio SET shares = ? WHERE userid = ? AND symbol = ?",
                       newshares, session["user_id"], symbol)
        else:
            db.execute("DELETE FROM portfolio WHERE symbol = ? AND userid = ?",
                       symbol, session["user_id"])

        # update history
        db.execute("INSERT INTO history (userid, symbol, shares, method, price) VALUES (?, ?, ?, ?, ?)",
                   session["user_id"], symbol, shares, 'Sell', price)

        flash(f"Sold {shares} shares of {symbol.upper()} for {usd(sold)}")
        return redirect("/")
```

```html file=buy.html
{% extends "layout.html" %}

{% block title %}
    Buy
{% endblock %}

{% block main %}
    <h2>Buy Shares</h2>
    <form action="/buy" method="post">
        <div>
            <input name="symbol" placeholder="Symbol" type="text" autocomplete="off" autofocus>
            <input name="shares" placeholder="Shares" type="number" autocomplete="off" autofocus min="0">
            <button type="submit">Buy</button>
        </div>
    </form>
{% endblock %}
```

```html file=history.html
{% extends "layout.html" %}

{% block title %}
    C$50 Finance: Portfolio
{% endblock %}

{% block main %}
    <table class="table table-bordered table-striped">
        <thead class="thead-light">
            <tr>
                <th>Symbol</th>
                <th>Shares</th>
                <th>Method</th>
                <th>Price</th>
                <th>Transacted</th>
            </thead>
            <tbody>
                {% for row in rows %}
                    <tr>
                        <td>{{ row['symbol'] }}</td>
                        <td>{{ row['shares'] }}</td>
                        <td>{{ row['method'] }}</td>
                        <td>{{ row['price'] | usd }}</td>
                        <td>{{ row['transacted'] }}</td>
                    </tr>
                {% endfor %}
            </tbody>
        </table>
{% endblock %}
```

```html file=index.html
{% extends "layout.html" %}

{% block title %}
    C$50 Finance: Portfolio
{% endblock %}

{% block main %}
    <table class="table table-bordered table-striped">
        <thead class="thead-light">
            <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Shares</th>
                <th>Price</th>
                <th>Total Value</th>
            </thead>
            <tbody>
                {% for row in rows %}
                    <tr>
                        <td>{{ row['symbol'] }}</td>
                        <td>{{ row['name'] }}</td>
                        <td>{{ row['shares'] }}</td>
                        <td>{{ row['price_usd'] }}</td>
                        <td>{{ row['total_usd'] }}</td>
                    </tr>
                {% endfor %}
                <tr>
                    <td colspan="4" align="right">Cash</td>
                    <td>{{ cash }}</td>
                </tr>
                <tr>
                    <td colspan="4" align="right">Total Value</td>
                    <td>{{ sum }}</td>
                </tr>
            </tbody>
        </table>
{% endblock %}
```

```html file=login.html
{% extends "layout.html" %}

{% block title %}
    Log In
{% endblock %}

{% block main %}
    <form action="/login" method="post">
        <div class="mb-3">
            <input autocomplete="off" autofocus class="form-control mx-auto w-auto" name="username" placeholder="Username" type="text">
        </div>
        <div class="mb-3">
            <input class="form-control mx-auto w-auto" name="password" placeholder="Password" type="password">
        </div>
        <button class="btn btn-primary" type="submit">Log In</button>
    </form>
{% endblock %}
```

```html file=quote.html
{% extends "layout.html" %}

{% block title %}
    Quote
{% endblock %}

{% block main %}
    <h2>Get a stock quote</h2>
    <form action="/quote" method="post">
        <input autofocus name="symbol" placeholder="Symbol" type="text">
        <button type="submit">Get Quote</button>
    </form>
{% endblock %}
```

```html file=quoted.html
{% extends "layout.html" %}

{% block title %}
    Quote
{% endblock %}

{% block main %}
    A share of {{ symbol['name']}} ({{symbol['symbol']}}) costs {{ symbol['price'] | usd}}
{% endblock %}
```

```html file=register.html
{% extends "layout.html" %}

{% block title %}
    Register
{% endblock %}

{% block main %}
    <form action="/register" method="post">
        <div class="mb-3">
            <input autocomplete="off" autofocus class="form-control mx-auto w-auto" name="username" placeholder="Username" type="text">
        </div>
        <div class="mb-3">
            <input class="form-control mx-auto w-auto" name="password" placeholder="Password" type="password">
        </div>
        <div class="mb-3">
            <input class="form-control mx-auto w-auto" name="confirmation" placeholder="Confirmation" type="password">
        </div>
        <button class="btn btn-primary" type="submit">Register</button>
    </form>
{% endblock %}
```

```html file=sell.html
{% extends "layout.html" %}

{% block title %}
    Sell
{% endblock %}

{% block main %}
    <h2>Sell Shares</h2>
    <form action="/sell" method="post">
        <div>
            <select class="form-control" name="symbol" type="text">
                <option value="" disabled selected>Symbol</option>
                {% for row in portfolio %}
                    <option value="{{ row['symbol'] }}">{{ row['symbol'] }}</option>
                {% endfor %}
            </select>
        </div>
        <div>
            <input name="shares" placeholder="Shares" type="number" min="1">
        </div>
        <button type="submit">Sell</button>
    </form>
{% endblock %}
```
