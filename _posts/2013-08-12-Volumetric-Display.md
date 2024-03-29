---
layout: post
title: Volumetric Display
github: https://github.com/rit-sse/SpaceJam?source=c
date: 2012-08-12
tags: hardware
---

The Volumetric Display was a project I worked on with the several members
of RIT's <a href="https://sse.rit.edu/">Society For Software Engineers</a>
and <a href="http://cias.rit.edu">College of Imaging Science</a>

It consists of a spinning mirror and a projector that displays one of 
96 different persppectives for every rotation of the mirror. It was a great 
multi-disiplinary project, and I personally got to explore things from computer
graphics to socket programming.

After a few dead-ends we arrived on a system where we could take a given 3D
object file and generate images 96 different perspectives with an automated 
<a href="http://en.wikipedia.org/wiki/Blender_(software)">blender</a> script. We would load the 96 images into our projector
through serial (that's where the socket programming came in!)
and cycle through them while a motor would spin the the mirror below.  The 
motor and the projector were synced with an FPGA board.

After five months of work, we were able to display a 3D monochrome object. We 
presented our display system at <a href="http://www.rit.edu/imagine">
ImagineRIT 2013</a> (an innovation and creativity festival) and took home
the Paychex prize.
