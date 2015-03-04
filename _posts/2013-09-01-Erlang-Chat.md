---
title: Erlang Chat
github: https://github.com/leeavital/Erlang-Chat
date: 1/1/2013
layout: post
tags: erlang programming
---

Recently I've been very interested in 
<a href="http://en.wikipedia.org/wiki/Erlang_%28programming_language%29">Erlang</a>, 
a concurrency oriented functional programming language. Erlang's best strengths are its 
powerful tools for writing mulit-process programs.

After familiarizing my self with the language, I dove into writing a small
multi-client, threaded chat server. Nothing too crazy &mdash; several clients would
be able to connect and send/receive messages asynchronously.

I wrote the server in about 120 lines of Erlang, using four files. I wrote a small 
(also threaded) client in python for testing purposes, although I plan to rewrite
the it in Erlang for completeness's sake. 

This was a great project to do in Erlang and I hope to do more things like this in the
future.

