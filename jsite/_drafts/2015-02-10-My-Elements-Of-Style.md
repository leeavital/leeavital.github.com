---
layout: post
date: 2015-02-10
tags: rant
title: (My) Elements of Style
---

The following are cut-and-dried style rules that I use personally. If you don't
agree with them, feel free to ignore them.

## Readability

The following variable names are forbidden:

  - data
  - result
  - value

The following function names are forbidden:

- process
- validate
- isValid
- filter (unless one of its parameters is a filtering function)


Braces are not optional, ever.

The name of the type is often a good name for a variable of that type. This is not the
case for primitive and standard library types.

{% highlight scala %}

// BAD
val string : String = "this is a useless string"
val bool : Boolean = true 

// OK
val user : User = ...

{% endhighlight %}


## Buggy idioms

Top and bottom types: In a type language, never use the top type (like Object), prefer parametric polymorphism.
If the language supports ADTs, never use the bottom type (null.) Otherwise, use as sparingly as possible.


If a function takes two parameters of the same type, use named arguments if possible. Example:

{% highlight scala %}

def lookUp( accountId: Long, viewerId: Long ) = ...

lookUp(v, a) // not ideal


lookUp( accountId = a, viewerId = v) // Ideal 
{% endhighlight %}

If given the choice use a typed language.


## Language specific

Python:

- Avoid range and prefer [enumerate](https://docs.python.org/2/library/functions.html#enumerate).

Scala:

- Don't chain/nest map, filter and flatMap too deeply. Instead use [for comprehensions](http://nerd.kelseyinnis.com/blog/2013/11/12/idiomatic-scala-the-for-comprehension/).
- Don't use scoped imports.

Javascript:

- There are many automatic style checkers and linters out there. Use one.
