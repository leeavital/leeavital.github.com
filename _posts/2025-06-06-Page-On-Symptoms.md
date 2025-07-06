---
title: Page on Symptoms, Analyze Causes
date: 2024-11-17
tags: practices
layout: post
---

*Or, don’t page on CPU and memory pressure.* 

Every so often, a change that burns CPU or memory gets rolled out and causes a user-facing issue.

When the postmortem rolls around, a reasonable suggestion to prevent similar issues  is “let’s page the on-call when CPU is high.” 

Note: when I say “page” here, I mean a stop-what-you’re-doing-get-out-of-bed-and-fix-it page.

Resist that temptation.

This is a classic mistake of paging on what I refer to as “causes”,  rather than “symptoms”.  A symptom is something users care about, like “none of my API requests are succeeding.” A cause is…well the cause of the symptom – for example “database requests are failing” or even “the database ran out of memory”.

While in our imaginary case, high CPU caused a real issue, signals like CPU and memory don’t  *always* correspond to real issues for users. And while these signals are important to watch, are you going to be happy about getting out of bed at 3am for a benign burst in CPU use?  I sure won’t be.  

It doesn’t matter to your users that your service is running hot on CPU. They probably care about error rates and maybe latency.

These are the signals that should get you out of bed in the middle of the night.  Paging on “causes” can lead to a lot of  bad outcomes.  For one, paging on causes can lead to lots of false positives. Just because, for example, CPU use is high, doesn’t mean the on-call person needs to do something Right Now.  Too many alerts can also lead to [**alarm fatigue**](https://en.wikipedia.org/wiki/Alarm_fatigue)  which has been written about at length.  

Instead, the signals you page on should be *as close* to what actual users care about as possible.  And if you don’t have those, you should probably spend some time building them. 

Taking this to its logical conclusion can lead to deferring pages for some surprising things such as:   

* Error rates for intermediate services being called by other services   
* The aforementioned CPU and memory   
* Network stability   
* Internal resources like thread pools or worker queues being saturated

There are good reasons to be skeptical\!

*If I only page on symptoms, how will I know why things are going wrong?*

Your runbooks and dashboards should contain the institutional knowledge about why symptoms might arise. For example, if you know database errors could cause 5xx errors, your alert text should drop you right into a dashboard with database errors displayed prominently. 

*But CPU and memory are important, and we want to keep them stable in the long run*

I couldn’t agree more\! But paging on these signals is abusing a system that’s supposed to be used for hair-on-fire emergencies. 

These are signals that you should be **analyzing** on a recurring basis. Some teams I’ve worked on have a recurring meeting to over service health. Others have pushed lower priority ‘cause’ alerts to a non-paging queue and triaged them during business hours. 

Having a reliable system and a manageable on-call load means being reactive on signals that map to immediate user impact, and proactive about everything else.

In other words, page on the symptoms of your problems. Analyze the causes.    
