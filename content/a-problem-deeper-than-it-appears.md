--- 
title: A Problem Deeper Than It Appears
date: "2026-08-19"
readTime: "3 min"
tags: ["system-design", "product-design", "ux", "architecture"]
---

A problem deeper than it appears on the surface...

So in the last blog, we covered how we can add a **"Use This File"** option on result cards, right?

Now the issue is, if you look at the image, it simply exposes all the features we can use.

That doesn't sound bad, right?

But wait till I put this into an example.

## The Problem

Let's say we perform **Studio Sounds** on an asset.

Now when the user clicks **Use This File**, showing **Studio Sounds** again doesn't really make sense at all.

Now one could argue for a very simple solution.

Without thinking too much, we could just filter things on the frontend based on which result card the user is on.

And yes, that would solve it.

But it doesn't feel like the ideal way.

## Looking at the Asset as a Whole

What I was thinking instead is something a bit different.

Rather than blindly showing all the available operations, let's do something where we look at the asset as a whole and see what has already been done.

Let's say it's already a short.

B-roll has already been added.

There is no noise whatsoever because we already performed noise reduction.

In that case, showing options like **B-Roll**, **Shorts**, or **Studio Sounds** again doesn't make much sense.

Showing something like **Social Content**, which can generate titles and descriptions for multiple platforms, makes a lot more sense.

This would make much more sense for the user as well.

## The Simple Solution

Now I do have a very simple idea for solving this filtering problem too.

But it would require some backend updates.

The backend would need to keep track of all the operations performed on an asset.

Then based on that information, we can simply filter things out.

No overkill.

No fancy logic.

Just track what has already been done and hide operations that no longer make sense.

## Why This Matters

Originally, we were thinking about showing all the operations available for an asset because chances are users will forget which operations they have already performed.

Yes, we have history.

But when you're dealing with gigabytes of video and audio assets, things add up pretty quickly and can get out of hand.

Here, with one stone, we would be killing two birds.

First, users don't have to remember what has already been done to an asset.

Second, they only see operations that actually make sense.

To me, that's a good sign of designing a system from the user's perspective instead of just building something for the sake of it.

It actually makes sense for the user rather than dumping every possible operation in front of them and expecting them to figure it out.

Because at the end of the day, our primary goal is to make the entire editing journey as smooth as possible.

Blue signing off.
