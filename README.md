# Ember Tutorial Component 

[![npm version](https://badge.fury.io/js/ember-tutorial-component.svg)](https://badge.fury.io/js/ember-tutorial-component)
[![Ember badge](https://embadge.io/v1/badge.svg?start=2.0.0)](https://embadge.io/v1/badge.svg?start=2.0.0)
[![Build Status](https://travis-ci.org/svkangal/ember-tutorial-component.svg?branch=master)](https://travis-ci.org/svkangal/ember-tutorial-component) 
[![Ember Observer Score](http://emberobserver.com/badges/ember-tutorial-component.svg)](http://emberobserver.com/addons/ember-tutorial-component)
[![Code Climate](https://codeclimate.com/github/svkangal/ember-tutorial-component/badges/gpa.svg)](https://codeclimate.com/github/svkangal/ember-tutorial-component)
[![Dependencies](https://david-dm.org/svkangal/ember-tutorial-component.svg)](https://david-dm.org/svkangal/ember-tutorial-component.svg)
[![Test Coverage](https://codeclimate.com/github/svkangal/ember-tutorial-component/badges/coverage.svg)](https://codeclimate.com/github/svkangal/ember-tutorial-component/coverage)

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
    ele: '#test1',
    message: 'First help message goes here.'
  }, {
    ele: '.test2',
    message: 'This is the next step.'
  }, {
    ele: '.test3:nth-child(1)',
    message: 'Final step, hit done to hide.'
  }]
}
```

### npm Url
[https://www.npmjs.com/package/ember-tutorial-component](https://www.npmjs.com/package/ember-tutorial-component)

### Ongoing Features
- Skip tutorial feature.
- Style Improvements
- Make features like skip/close optional and configurable. #9

### Future Enhancements
- Support HTML content in tooltips
      

