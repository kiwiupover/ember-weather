# Ember-weather

This README outlines the details of collaborating on this Ember application.

A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at http://localhost:4200.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)


  Now we can clone the ember-weather repo. You'll want to change into the directory that you store your projects.

  For example:
  ```sh
  cd ~/Projects
  ```

  Then clone the repo:
  ```sh
  git clone git@github.com:kiwiupover/ember-weather.git
  cd ember-weather
  ```

  Install project dependencies with npm and bower:
  ```sh
  npm install
  bower install
  ```

  ### Sign up for your API keys.
  Weather Underground for fetching weather data. Signup for free developer account.

  - [Wunderground API sign up](http://www.wunderground.com/weather/api/d/login.html)

  500px for stunning background photography. Sign up for free developer account.

  - [500px API](https://500px.com/signup)

  ## Running the Ember Weather app
  To start the app, run the grunt server command with your API keys
  ```sh
  WUNDERGROUND_KEY=[your wunderground key] FIVEHUNDRED_PX_KEY=[your 500px key] grunt server
  ```

  ### Launch the app in your web browser
  You should now be able to navigate to [http://localhost:8000](http://localhost:8000) to see the app.

  ## Special Thanks

  This project could not have happened without help from
  - [Erik Trom](https://github.com/trombom)
  - [Gordon Potter](https://github.com/eccegordo)
  - [Josh Williams](https://github.com/tucsonlabs)

  Also huge thank you to the ember communty Yehuda, Tom, Stefan, Kris and all the contrubuters to [Ember-app-kit](https://github.com/stefanpenner/ember-app-kit)

  
