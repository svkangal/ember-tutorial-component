# Ember Tutorial Component 

[![Build Status](https://travis-ci.org/svkangal/ember-tutorial-component.svg?branch=documentation)](https://travis-ci.org/svkangal/ember-tutorial-component) [![Ember Observer Score](http://emberobserver.com/badges/ember-tutorial-component.svg)](http://emberobserver.com/addons/ember-tutorial-component)

## Index

 - [Demo](#demo)
 - [Installation](#installation)
 - [Running](#running)
 - [Running Tests](#running-tests)
 - [Usage](#usage)
 - [API](#api)
 - [npm Url](#npm-url)
 - [Ongoing Features](#ongoing-features)
 - [Future Enhancements](#future-enchancements)

## Demo
 - Live Demo Link
   [Demo](https://svkangal.github.io/ember-tutorial-component/)

 - Demo Gif
   ![ezgif com-video-to-gif 1](https://cloud.githubusercontent.com/assets/2807160/17454524/fe61d674-5b4d-11e6-8f3f-d5dfb9a2bb57.gif)

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at [http://localhost:4200/tutorial](http://localhost:4200/tutorial)

## Running Tests

* `ember test`
* `ember test --server`

### Usage
```javascript
  {{ember-tutorial-component
    config=config
  }}
```
## API

* `config`: Configuration for the component

```javascript
{ 
  data: [{
    eleId: 'test1',
    message: 'First help message goes here.'
  }, {
    eleId: 'test2',
    message: 'This is the next step.'
  }, {
    eleId: 'test3',
    message: 'Final step, hit done to hide.'
  }]
}
```

### npm Url
[https://www.npmjs.com/package/ember-tutorial-component](https://www.npmjs.com/package/ember-tutorial-component)

### Ongoing Features
List all the current features in development.

### Future Enhancements
List all the future enhancements for this addon.
      

