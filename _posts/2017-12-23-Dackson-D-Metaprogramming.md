---
title: "Dackson: a Gentle Introduction to Metaprogramming in D"
github: https://github.com/leeavital/dackson
date: 2017-12-23
tags: D programming
layout: post
---

Earlier this week I found myself writing a command line utility to hit a web
service I use fairly frequently.  I decided to write it in D because time wasn't much an issue,
I wanted a compiled executable, and [D is awesome](https://tour.dlang.org/).

As most webservices do, this one deals in JSON endpoints.

[D's standard JSON library](https://dlang.org/phobos/std_json.html) stops at a type called `JSONValue`. `JSONValue` can, at runtime, be converted into other
JSON types like a `JSONValue[]`, a `JSONValue[string]` (the D syntax for map
from string to JSON), numeric types, booleans, and strings.

What this winds up meaning is that you write a bunch of cumbersome conversion
functions between your program's data structures and this untyped JSON
structure.


For work, I've become accustomed to using
[Jackson](https://github.com/FasterXML/jackson), a Java library used to go
between untyped JSON objects and Java classes. Using it is pretty simple:

```java
class Point {
  private long xValue;
  private long yValue;

  public Point(
    @JsonProperty("x") long x,
    @JsonProperty("y") long y) {
      this.x = x;
      this.y = y;
  }

  // equals, hashCode, accessors, etc.
}


// elsewhere in the program...

String rawJson = makeANetworkCall(); // this holds the text {"x:" 0, "y": 0}
Point p = new ObjectMapper().readValue(Point.class,  rawJson);
```

First we describe our type in Java --- using `@JsonProperty` constructor
annotations we can tell Jackson that two fields (`x` and `y`) of type `long`
are used to construct the class.  Later in the program, at runtime, an
`ObjectMapper` knows how to learn about that constructor, extract the
appropriate values from a raw JSON string, and invoke that constructor with the
extracted values to create a `Point.` This API has its drawbacks --- and
there's much more to what Jackson can do than I'm showing here --- but all in
all, this is a nice way to deal with JSON in a typed language.


## Enter Dackson

I wanted to achieve something similar in D. Enter `Dackson`! A port of Jackson for D.

At it's core --- what Jackson is doing when deserializing, is looking at the
type being deserialized and finding a function which can go from generic JSON
to that type. Java does this with lots of reflection,  but the D way is to use
compile time metaprogramming.

To do this, we'll write `JsonCodec` templates which hold a single function ---
`T deserialize(JSONValue input)` --- which knows how to marshal JSON into a
specific type `T`.  A template is a sort of module, parameterized by types and
primitive values, of which many can be constructed at compile time. <sup>1</sup>.


To start out, we can write `JsonCodec` templates for our easy types like `string`
and `long`

 
```cpp
import std.json;

template JsonCodec(T: long) {
  long deserialize(JSONValue value) {
    return value.integer(); }
}

template JsonCodec(T: string) {
  string deserialize(JSONValue value) {
    return value.str();
  }
}

unittest {
  JSONValue json = parseJSON(`1234`);
  long deser = JsonCodec!(long).deserialize(json);
  assert(deser == 1234);

  json = parseJSON(`"hello"`);
  string deserString = JsonCodec!(string).deserialize(json);
  assert(deserString == "hello");
}
```

Here I've defined two `JsonCodec`s --- one for `string` and one for `long`. My
unit tests will --- at compile-time --- construct two specializations of
`JsonCodec` which know how to convert to the types I've specified. The cool thing about this
is that the compiler will ensure that the `JsonCodec` can be found for the right type. This means that other deserializations would fail.

For example, this would fail to compile, complaining that we cannot construct a `JsonCodec!bool`

```cpp
unittest  {
  json = parseJSON(`true`);
  bool deserBool = JsonCodec!(bool).deserialize(json);
  assert(deserBool == true);
}
```

To fix it, we need to define a `template JsonCodec(T: bool)`, which is easy
enough. 

## Complex Types

Now: suppose we want to deserialize more interesting types? To achieve that we can define a
more complex template, which can act upon a range of datatypes. We can define a
template, for example that will act only on all structures.

```cpp
template canZeroConstruct(T) {
  static if (__traits(compiles, T())) {
    enum bool canZeroConstruct = true;
  } else {
    enum bool canZeroConstruct = false;
  }
}

template JsonCodec(T) if(canZeroConstruct!T) {
  import std.traits;
  T deserialize(JSONValue json) {
    alias TYPES = Fields!T;
    alias NAMES = FieldNameTuple!T;

    auto builder = T();
    foreach (i, string name ; NAMES) {
      alias TYPE = TYPES[i];
      alias Codec = JsonCodec!TYPE;

      TYPE value = Codec.deserialize(json[name]);
      __traits(getMember, builder, name) = value;
    }
    return builder;
  }
}
```

There's a lot happening here:

1. We create a `canZeroConstruct` template which (at compile time) determines
	 if we can "zero-construct" a type by testing if the code `T()` will compile.
	 This means for a `struct Foo`, which be created simply by writing `Foo()`
   the template will return true, and for types like classes which need the `new` keyword,
	 it will not. <sup>2</sup>
1. We can create a `JsonCodec` for all `T`s which satisfy `canZeroConstruct`.
1. The `JsonCodec(T)` obtains the type sequence and name sequence of the fields
	 of the struct. For a `struct { int x;  string y; }`, the type sequence would be
	 `(int, string)` and the name sequence would be (`x, y`). This happens with the templates
	`Fields` and `FieldNameTuple` from `std.traits`.
1. We create an empty version of the target type called `builder`
1. We loop through the types and field names, and for each name/type pair we lookup the value from the input JSON,
	 create a new `JsonCodec` to deserialize that value into the type we want, and use a `__traits` call to modify
   our `builder`.

[__traits](https://dlang.org/spec/traits.html) are a powerful building block for building templates in D. They will, at compile time, expand or transform expressions. I used two traits in the above code. Once to
test if a piece of code would compile at compile time `__traits(compiles, new ThisIsAClass())` would expand to `false`, and a second time to assign a field when all I had was the string name of the struct's field
(`__traits(getMember, foo, "bar")` would expand to `foo.bar`.)

Now we can deserialize JSON into any struct (provided all the fields are mutable) using the struct field names to determine the
JSON field names. We even get deeply nested structs for free!

```cpp
unittest {
  struct Point {
    long x = 0;
    long y = 0;
  }

  struct Line {
    Point from;
    Point to;
    string label;
  }

  auto json = parseJSON(`{"from": {"x": 0, "y": 0}, "to": {"x": 2, "y": 2}, "label": "my line"}`);
  auto deser = JsonCodec!Line.deserialize(json);
  assert(deser == Line(Point(0, 0), Point(2, 2), "my line"));
}
```

Now, suppose we want to customize our with to control how our fields are
deserialized with a `JsonProperty` annotation. This is a nice feature if our
JSON API uses snake-case names and we want our D structures to use camel-case
names .

For example, we might want to write code like this:

```cpp
struct User {
	@JsonProperty("user_name") string userName;
}

auto json = parseJSON(`{"user_name": "Lee"}`);
alias codec = JsonCodec!User;
assert(codec.deserialize(json) == User("Lee"));
```

Well that turns out to be simple too.  First we define a struct that
we'll eventually use to annotate our field.

```cpp
struct JsonProperty {
  string name;
  alias name this;
}
```

Then we define a template which can find said annotation at compile time. We'll need to use many of the same utilities we used in `JsonCodec`, as well
as a new `trait` --- `getUDAs`. A `UDA` stands for user-defined-attribute. All that means is that we're using a user-defined struct to annotate
something (in this case a field of a struct.)

```cpp
template JsonMetadata(T, string field) {
  import std.traits;
  alias names = FieldNameTuple!T;
  alias TYPES = Fields!T;

  // the name of the
  string serialName() {
    foreach (name ; names) {
      if (name == field) {
        auto udas =  getUDAs!(__traits(getMember, T, name), JsonProperty);
        string ret = field;
        static if (udas.length != 0) {
          ret = udas[0];
        }
        return ret;
      }
    }
  }
}
```

Then, all we have to do is make some light modifications in `JsonCodec(T)`:

```cpp
...
foreach (i, string name ; NAMES) {
	alias TYPE = TYPES[i];
	alias Codec = JsonCodec!TYPE;

-	TYPE value = Codec.deserialize(json[name]);
+	alias META = JsonMetadata!(T, name);
+	TYPE value = Codec.deserialize(json[META.serialName()]);
	__traits(getMember, builder, name) = value;
}
return builder;
```

The library as I've described it is available on
[Github](https://github.com/leeavital/dackson) and the [DUB package
registry](http://code.dlang.org/packages/dackson).  The methods I've laid out
here have been enough to write my CLI, but I hope to add new features like
special casing missing values, and adding support for classes and immutable
structs.


<br />
<br />
<br />

<sup>1</sup> These are akin to typeclasses in Haskell or Scala. Or maybe functors in ML.
<br />
<sup>2</sup> The template does not actually return true, but instead exports a single enum type which can be statically determined to be `true` or `false`.
