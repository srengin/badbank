Inner
=====

Get and set values in deeply nested objects.

Installation
------------

```bash
npm install inner
```

Usage
-----

```js
var inner = require('inner');
var object = {
  user: {
    name: 'John',
    friends: ['Mike', 'Alex']
  }
};

inner.get(object, ['user', 'friends', '0']); // -> 'Mike'
inner.set(object, ['user', 'name'], 'Chris'); // object.user.name == 'Chris'
inner.has(object, ['user', 'friends', '1']); // -> true
```

Credits
-------

_Inner_ is just like [this library](https://github.com/cowboy/node-getobject), but with support for specifying nested properties as arrays instead of strings.
