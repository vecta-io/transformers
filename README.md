# transformers
Lightweight zero-dependency transformation matrix utilities

[![NPM](https://nodei.co/npm/transformersjs.png)](https://nodei.co/npm/transformersjs/)

## Why
Perform transformation matrix calculation in a 2D plane. Use this library to:
- Create a transformation matrix and manipulate it via **translation**, **rotation**, **scale**, **shear**, **skew**
- Parse a transformation in string format, `translate(10 20) rotate(30)`
- Obtain a point after applying transformation
- Obtain matrix in string format to be used in CSS or SVG

## Install
```
npm install transformersjs
```

## Usage

Initialize a matrix

```javascript
var transformers = require('transformers');

var mat = transformers();

mat.matrix; // { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
```
Parse transformation in string

```javascript
var transformers = require('transformers');

var mat = transformers('translate(10, 15) rotate(30)');
//OR
var mat = transformers().translate(10, 15).rotate(30);

mat.matrix; //{ a: 1, b: 0, c: 0, d: 1, e: 10, f: 15 }
```

Obtain a point after applying transformations

```javascript
var transformers = require('transformers');

var mat = transformers('translate(10, 15)');

mat.pointTo(8, 5); // { x: 18, y: 20 }
```

Convert matrix to string to be used in CSS or SVG

```javascript
var transformers = require('transformers');

var mat = transformers('translate(10, 15)');

mat.render(); // matrix(1,0,0,1,10,15)
```

## API

<a name="transformers"></a>

## transformers : <code>object</code>
Initializer to create a matrix instance

**Kind**: global namespace  

| Param | Type | Description |
| --- | --- | --- |
| [input] | <code>string</code> \| <code>object</code> \| <code>array</code> | Can be a transformation in string, object, array notation |


* [transformers](#transformers) : <code>object</code>
    * [.multiply(matrix)](#transformers.multiply) ⇒ [<code>transformers</code>](#transformers)
    * [.parse(str)](#transformers.parse) ⇒ [<code>transformers</code>](#transformers)
    * [.translate(x, [y])](#transformers.translate) ⇒ [<code>transformers</code>](#transformers)
    * [.rotate(angle, [x], [y])](#transformers.rotate) ⇒ [<code>transformers</code>](#transformers)
    * [.scale(x, [y])](#transformers.scale) ⇒ [<code>transformers</code>](#transformers)
    * [.shear(x, y)](#transformers.shear) ⇒ [<code>transformers</code>](#transformers)
    * [.skew(x, y)](#transformers.skew) ⇒ [<code>transformers</code>](#transformers)
    * [.inverse()](#transformers.inverse) ⇒ [<code>transformers</code>](#transformers)
    * [.pointTo([x], [y])](#transformers.pointTo) ⇒ <code>Object</code>
    * [.render()](#transformers.render) ⇒ <code>string</code>

<a name="transformers.multiply"></a>

### transformers.multiply(matrix) ⇒ [<code>transformers</code>](#transformers)
Perform matrix multiplication

**Kind**: static method of [<code>transformers</code>](#transformers)  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>object</code> \| <code>array</code> \| [<code>transformers</code>](#transformers) | matrix to be multiplied |

<a name="transformers.parse"></a>

### transformers.parse(str) ⇒ [<code>transformers</code>](#transformers)
Parse a valid string containing various transformations

**Kind**: static method of [<code>transformers</code>](#transformers)  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="transformers.translate"></a>

### transformers.translate(x, [y]) ⇒ [<code>transformers</code>](#transformers)
Perform translation

**Kind**: static method of [<code>transformers</code>](#transformers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | translation along x-axis |
| [y] | <code>number</code> | <code>0</code> | translation along y-axis |

<a name="transformers.rotate"></a>

### transformers.rotate(angle, [x], [y]) ⇒ [<code>transformers</code>](#transformers)
Perform rotation

**Kind**: static method of [<code>transformers</code>](#transformers)  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | angle in degree |
| [x] | <code>number</code> | rotation along a point in x-axis |
| [y] | <code>number</code> | rotation along a point in y-axis |

<a name="transformers.scale"></a>

### transformers.scale(x, [y]) ⇒ [<code>transformers</code>](#transformers)
Perform scaling

**Kind**: static method of [<code>transformers</code>](#transformers)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | scaling along x-axis |
| [y] | <code>number</code> | <code>x</code> | scaling along y-axis |

<a name="transformers.shear"></a>

### transformers.shear(x, y) ⇒ [<code>transformers</code>](#transformers)
Perform shear

**Kind**: static method of [<code>transformers</code>](#transformers)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | shear along x-axis |
| y | <code>number</code> | shear along y-axis |

<a name="transformers.skew"></a>

### transformers.skew(x, y) ⇒ [<code>transformers</code>](#transformers)
Perform skew

**Kind**: static method of [<code>transformers</code>](#transformers)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | skew along x-axis |
| y | <code>number</code> | skew along y-axis |

<a name="transformers.inverse"></a>

### transformers.inverse() ⇒ [<code>transformers</code>](#transformers)
Inverse current matrix

**Kind**: static method of [<code>transformers</code>](#transformers)  
<a name="transformers.pointTo"></a>

### transformers.pointTo([x], [y]) ⇒ <code>Object</code>
Obtain a point after applying transformation

**Kind**: static method of [<code>transformers</code>](#transformers)  

| Param | Type | Default |
| --- | --- | --- |
| [x] | <code>number</code> | <code>0</code> | 
| [y] | <code>number</code> | <code>0</code> | 

<a name="transformers.render"></a>

### transformers.render() ⇒ <code>string</code>
Converts current matrix to string format to be used in CSS or SVG

**Kind**: static method of [<code>transformers</code>](#transformers)  
