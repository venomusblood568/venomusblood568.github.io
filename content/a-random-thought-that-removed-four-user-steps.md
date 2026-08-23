---
title: A Random Thought That Removed Four User Steps
date: "2026-08-16"
readTime: "2 min"
tags: ["product-design", "system-design", "ux", "frontend", "developer"]
---

A few months back, we were discussing a **"Use This File"** option in a few places across the app.

One of those places was the asset preview card.

The idea was pretty simple.

Instead of making users upload the same file again and again, we would show a list of operations that can be performed on that asset. Once the user selects one, we skip the upload step completely, send the asset directly to the config section, let them adjust the settings, and generate.

The implementation was also pretty straightforward.

We already have an endpoint that gives us all available operations from our schema-driven system.

So we simply reuse that list, show it to the user, and forward them to the configuration step.

That part was solved.

## The Thought

Recently, I started thinking about doing the same thing on result cards.

Let's say you use Studio Sounds to clean up background noise from an audio file.

Now you want to use that cleaned audio inside Social Content to generate titles and descriptions for multiple platforms.

Today, the flow looks something like this:

1. Open Social Content
2. Select the result file
3. Open Config
4. Generate

There is nothing particularly wrong with that flow.

But it's still four actions the user has to perform.

## A Simpler Flow

If we had a **"Use This File"** option directly on the result card, we could send users straight to the configuration step and skip part of the journey entirely.

The user already has the file.

The system already knows the file.

So why make them find it again?

Sometimes the biggest UX improvements aren't new features.

They're just removing unnecessary steps.

## The Interesting Part

When we moved to a schema-driven architecture a few months ago, I originally put this idea on hold.

The plan was simple:

> Wait until the backend exposes everything needed and let the frontend render whatever it receives.

At the time, that felt like the cleanest solution.

But today, while thinking about something completely unrelated, I realized something.

We could probably build this using almost the exact same approach we're already using on asset cards.

No backend changes.

No new endpoints.

No major architecture work.

Just reusing patterns that already exist.

## The Catch

Of course, there is a catch.

This creates a hybrid approach.

Part of the solution remains schema-driven.

Part of it becomes frontend-driven.

And that introduces a problem.

A problem I didn't notice until I started walking through the implementation details.

At first glance, the feature feels obvious.

By the time I finished thinking through it, I realized it opens up a much larger architectural question.

That's what I'll be writing about next.

Blue signing off.
