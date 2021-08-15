# Kit List

A web app for helping you prepare for an adventure, holiday, or trip.
Select the categories needed for your trip and tick off the items
as you pack. Download lists and share them when organising multiple
people on the same trip.

Enjoy it at [Kitlist](https://zakwarren.github.io/kitlist/)

## Setup

You need [Node.js](https://nodejs.org) installed on your machine.
Simply download the installer from [nodejs.org](https://nodejs.org)
and go through the installation steps.

Once Node.js is installed, open your command prompt or terminal
and **navigate into this project folder**. The you can install
the dependencies using:

```bash
npm install
```

Once all the dependencies are successfully installed, run:

```bash
npm start
```

This launches both the dev version of the app. You can visit
[localhost:3000](http://localhost:3000) to see the running
application.

## Testing

This project uses the [jest](https://jestjs.io/) testing framework
and the [enzyme](https://enzymejs.github.io/enzyme/) utility to
make it easier to test the React components' output.

To run tests on the front end code that has changed since the last
commit, run:

```bash
npm test
```

To run all of the front end tests, use:

```bash
npm test -- --watchAll
```

## Build

To compile the app, run:

```bash
npm run build
```

This can be copied to the production server and run
as is.

## Authors

- **Zak Warren** - _Initial work_
