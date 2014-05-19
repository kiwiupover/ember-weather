# Ember Weather

Ember Weather is an application built with [Ember JS](http://emberjs.com/) and [Ember App Kit](https://github.com/stefanpenner/ember-app-kit).

## Getting Started
There are a few dependencies you will need installed on your computer if you haven't already.


- [Node.js](http://nodejs.org/)
- [Git (Version Control Software)](http://git-scm.com)
- [Grunt.js](http://gruntjs.com/)
- [Bower.js](http://bower.io)

To install Grunt and Bower using following commands:
```sh
npm install -g grunt-cli
npm install -g bower
```

Now we can clone the ember-weather repo. You'll want to change into the directory that you store your projects.

For example:
```sh
cd ~/Projects
```

Then clone the repo:
```sh
git clone https://github.com/kiwiupover/ember-weather.git
cd ember-weather
```

Install project dependencies with npm and bower:
```sh
npm install
```

### Sign up for your API keys.
Weather Underground for fetching weather data. Signup for free developer account.

- [Forecast.io API sign up](http://developer.forecast.io)

500px for stunning background photography. Sign up for free developer account.

- [500px API](https://500px.com/signup)

## Running the Ember Weather app
To start the app, run the grunt server command with your API keys
```sh
FORECAST_KEY=[your wunderground key] FIVEHUNDRED_PX_KEY=[your 500px key] grunt server
```

### Launch the app in your web browser
You should now be able to navigate to [http://localhost:8000](http://localhost:8000) to see the app.

## Special Thanks

This project could not have happened without help from
- [Erik Trom](https://github.com/trombom)
- [Gordon Potter](https://github.com/eccegordo)
- [Josh Williams](https://github.com/tucsonlabs)

Also huge thank you to the ember communty Yehuda, Tom, Stefan, Kris and all the contrubuters to [Ember-app-kit](https://github.com/stefanpenner/ember-app-kit)
