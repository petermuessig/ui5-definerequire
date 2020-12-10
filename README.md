# Understand Module Loading in UI5

UI5 is using an AMD-like module loader. Documentation is available in the SDK: [Loading a Module](https://sapui5.hana.ondemand.com/sdk/#/topic/d12024e38385472a89c1ad204e1edb48).

## `sap.ui.define` vs. `sap.ui.require`

The different between both APIs is the following:

* Modules are defined with `sap.ui.define`
* Modules are required with `sap.ui.require`

For these functions using the Global is explicitly allowed... ;-)

### Define modules with `sap.ui.define`

The easiest way to define a module is the following:

```js
sap.ui.define(function() {
  [...]
  return TheModule;
});
```

To require the immediate dependencies for your module you can specify them as an `Array<String>` of module names. This loads the modules before your module is defined and injects them as parameters to your define function:

```js
sap.ui.define([ "sap/m/Button", ... ], function(Button, ...) {
  [...]
  return TheModule;
});
```

When AMD-like modules are bundled in one file, they need to be named. Therefore you can use the optional first parameter to specify the module name. Normally, the name is derived by the module loader when resolving an import and mapping this module to a URL:

```js
sap.ui.define("my/namespace/Module", [ "sap/m/Button", ... ], function(Button, ...) {
  [...]
  return TheModule;
});
```

**Return value is attached to the module name!**

### Require modules with `sap.ui.require`

To require modules we have two options: just return the loaded module which is a synchronous call and requiring a module explicetly.

The following snippet demonstrates how you can lookup an already loaded module within your code. If you just need a dependency on demand and also optional, this is the best way to do it:

```js
var TheModule = sap.ui.require("my/namespace/Module");
```

*Hint*: the UI5 behavior is here different from the standard AMD behavior. While AMD will throw an error when the module is not available, for UI5 this function returns `undefined`.

But if you need to require and load the module, then you can use the async variant to do so:

```js
sap.ui.require(["my/namespace/Module"], function(TheModule) {
  [...]
});
```

*Keep in mind*: the first parameter is an `Array<String>` specifying the module names. If you just pass a `String` this will behave like above.

### What are the preloads about?

Library and Component preloads just populate the module loader cache. E.g. if the module `my/namespace/Module` is required in your code, the module loader first does a lookup in its cache. Once the module is found it is not loaded anymore.

### Hints

* Forget the legacy APIs:
  * `jQuery.sap.declare`: legacy API to declare a module namespace
  * `jQuery.sap.require`: legacy API to require modules synchronously
* Avoid Globals:
  * Do not use Controls by their global name `new sap.m.Button({...})` which triggers a synchronous require of this module and all transitive required modules!
