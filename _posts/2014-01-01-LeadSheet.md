---
title: LeadSheet
github: http://github.com/leeavital/LeadSheet
date: 1/1/2014
layout: post
tags: python music
---

LeadSheet is a project I'm working on that allows you to type in some chords
and get a backing track to solo over.  The backing has a simple drum beat. 
a walking bass line and piano.


The portion that generates the music is written in pure python, and the
front-end is written in [python/flask](http://flask.pocoo.org).

<br />

### How does it work?
_Warning: I'm going to use a few music terms_

To go from a list of chords to a sound file, a couple of things need to happen:

- The textual representation of each chord is transformed in a list of pitches.
- I go through every chord, and, using a variety of musical patterns and heuristics,
generate a (hopefully) realistic sounding arrangement.
- Using an algorithm resembling tree traversal, I write the music to
a MIDI file (using <a href="http://code.google.com/p/midiutil/">
MIDIUtil for python</a>.)


<br />

### Plans for the future

- More complex chords and voice analysis. As of now, the only valid input
chords are the four types of triads.  The first thing to come in will be the
varieties of seventh chords. The next thing will be voice leading to make
chords transition seem more natural.

- Different feels. Right now I can only generate walking-bass style
arrangements. In the pipeline are 5/4 and salsa feels.

- A better front-end. Right now, a user has to type every chords individually.
Yuck.
