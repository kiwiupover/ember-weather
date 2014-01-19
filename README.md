# Ember Weather

Ember Weather is an application built with [Ember App Kit](https://github.com/stefanpenner/ember-app-kit). You'll need to install [Node.js](http://nodejs.org/) before getting started.

## Getting Started

After you have node, you'll also need to get Grunt and Bower set up.

```
npm install -g grunt-cli
npm install -g bower
```

Now we can clone the repo. You'll want to change into the directory that you store your projects in. For example:

```
cd ~/Projects
```

Then clone the repo and install our dependencies with npm and bower.

```
git clone git@github.com:kiwiupover/ember-weather.git
npm install
bower install
```

Next sign up for your API keys.
[Wunderground API sign up](http://www.wunderground.com/weather/api/d/login.html)
[500px API](https://500px.com/signup)

## Running Ember Weather
To start the app, you'll want to change into the directory you cloned this repo to:
```
cd ember-weather
```

Then run the grunt server command with your API keys
```
WUNDERGROUND_KEY=[your wunderground key] FIVEHUNDRED_PX_KEY=[your 500px key] grunt server
```

## Open the app in your web browser
You should now be able to navigate to (http://localhost:8000) to see the app.

## Special Thanks

This project could not have happened with out help from [Erik Trom](https://github.com/trombom), [Gordon Potter](https://github.com/eccegordo), and [Josh Williams](https://github.com/tucsonlabs).

Also huge thank you to the ember communty Yehuda, Tom, Stefan, Kris and all the contrubuters to [Ember-app-kit](https://github.com/stefanpenner/ember-app-kit)


