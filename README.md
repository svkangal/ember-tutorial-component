# Ember Tutorial Component

[![npm version](https://badge.fury.io/js/ember-tutorial-component.svg)](https://badge.fury.io/js/ember-tutorial-component)
[![Ember badge](https://embadge.io/v1/badge.svg?start=2.0.0)](https://embadge.io/v1/badge.svg?start=2.0.0)
[![Build Status](https://travis-ci.org/svkangal/ember-tutorial-component.svg?branch=master)](https://travis-ci.org/svkangal/ember-tutorial-component)
[![Ember Observer Score](http://emberobserver.com/badges/ember-tutorial-component.svg)](http://emberobserver.com/addons/ember-tutorial-component)
[![Code Climate](https://codeclimate.com/github/svkangal/ember-tutorial-component/badges/gpa.svg)](https://codeclimate.com/github/svkangal/ember-tutorial-component)
[![Dependencies](https://david-dm.org/svkangal/ember-tutorial-component.svg)](https://david-dm.org/svkangal/ember-tutorial-component.svg)
[![Test Coverage](https://codeclimate.com/github/svkangal/ember-tutorial-component/badges/coverage.svg)](https://codeclimate.com/github/svkangal/ember-tutorial-component/coverage)

Ember Add-on for step-by-step guide and feature introduction, built on top of [Tether](http://tether.io/) library, that supports auto-scroll, configuration and expiration.

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
   ![ezgif com-video-to-gif 1](https://cloud.githubusercontent.com/assets/2807160/17646596/c78394d8-6185-11e6-8ad5-e12733b6b709.gif)

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
    target: "css-selector",
    message: "string",
    pointerDirection: "top" | "bottom" | "left" | "right",
    offset: "10px 20px",
    constraints: {
      constrainedAreaContainer: "css-selector",
      scrollableContainer: "css-selector"
    },
    actions: {
      previous: function() {},
      next: function() {}
    },
    mask: {
      enabled: "boolean",
      zIndex: "number"
    }
  },
  ...
  }],
  mask: {
    enabled: "boolean",
    zIndex: "number"
  },
  expiration: {
    localStorageKey: "string",
    duration: "number"
  },
  actions: {
    afterDone: function() {}
  }
}
```
#### Data

`data` provides the configuration for each message that will be displayed.
| Parameter    | Type        | Description       |
| :----------- | :---------- | :---------------- |
| `target`     | String ([CSS-Selector](https://www.w3schools.com/cssref/css_selectors.asp)) | CSS-Selector for the element that the message box will attach to. If there are more than one selected element from the selector, only the first one will be attached. |
| `message`    | String      | Message that will be displayed on each step. |
| `pointerDirection` | String | Direction of the pointer and orientation that the message will attach to the target. <br> **Supported Value:** `top`, `bottom`, `left` and `right` <br> **Default Value:** `bottom` |
| `offset`     | String      | Offset value of the message box from target attachment. See [Tether.io's ](http://tether.io/) `offset` value for more details. |
| `constraints.constrainedAreaContainer` | String ([CSS-Selector](https://www.w3schools.com/cssref/css_selectors.asp)) | Selector for the parent element that the message box will attach to. The message will disappear when it's out of the view of parent element. |
| `constraints.scrollableContainer` | String ([CSS-Selector](https://www.w3schools.com/cssref/css_selectors.asp)) | Scrollable element that will automatically scroll the message box into view. Note that the element should be a positioned element for the scroll behavior to work correctly. |
| `actions.previous` | Function   | Callback when user clicks previous. It can be used to handle interaction, e.g. click event, along with the message. |
| `actions.next` | Function   | Callback when user clicks next. It can be used to handle interaction, e.g. click event, along with the message. |
| `mask.enabled` | Boolean    | If `true`, shows the mask around the message box, and `false` otherwise. |
| `mask.zIndex`  | Number     | `z-index` value for the mask. <br> **Default Value:** 1000 |

#### Mask

`mask` provides the configuration for the backdrop that will mask the rest of the page, except the message box. Its properties are identical to `mask.enabled` and `mask.zIndex`. If it is not included in `config`, no mask will be displayed.


| Parameter    | Type        | Description       |
| :----------- | :---------- | :---------------- |
| `enabled` | Boolean    | If `true`, shows the mask around the message box, and `false` otherwise. |
| `zIndex`  | Number     | `z-index` value for the mask. <br> **Default Value:** 1000 |

#### Expiration

`expiration` gives the control on the expiration of the tutorial. It does so by storing the expiration date in `localStorage`. It will not show the tutorial to the user that has already seen within the specified duration and renew the expiration date for the user that has last seen passed the specified duration.

| Parameter    | Type        | Description       |
| :----------- | :---------- | :---------------- |
| `localStorageKey` | String | Key to store the expiration date in `localStorage` |
| `duration`   | Number      | Duration in hour that the user will not see the tutorial until the specified amount of duration has passed. For example, if `duration` is 10, the users will not see the tutorial after first seen for 10 hours. After that, if the user sees the tutorial again, the expiration will be renewed to the next 10 hours that the user will not be able to see the tutorial again. |


#### actions

`actions` provides the callback during various steps of the guides.

| Parameter    | Type        | Description       |
| :----------- | :---------- | :---------------- |
| `afterDone`    | Function    | Callback when user finishes the tutorial |

### npm Url
[https://www.npmjs.com/package/ember-tutorial-component](https://www.npmjs.com/package/ember-tutorial-component)



### Ongoing Features
- Skip tutorial feature/ Close button.
- Style Improvements and better layout for tooltips
- Make features like skip/close optional and configurable.

### Future Enhancements
- Support HTML content in tooltips
