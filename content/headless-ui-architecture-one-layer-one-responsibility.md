---
title: "Headless UI Architecture: One Layer, One Responsibility"
date: "2026-02-08"
readTime: "4 min"
tags: ["architecture", "system-design", "frontend", "react", "typescript"]
---

In my last blog, I talked about why we decided to move toward a schema-driven architecture.

I was supposed to write this follow-up much sooner, but building the headless UI architecture itself took almost two weeks. I didn't want to write about it halfway. I wanted it to be stable, usable, and actually working.

A couple of days ago, we shipped a new feature. What surprised me was that almost **99% of the UI worked without any frontend changes**.

I barely touched the UI code.

I only had to handle a few edge cases.

That's when I felt this architecture was finally worth writing about.

Before getting into the edge case, let me walk through how the headless UI architecture is structured.

## A Quick Note Before We Begin

These layer names are **not hardcoded or standard names**.

I've named them based on how I implemented and reasoned about them.

Your architecture might use different names, and that's completely fine.

What matters is **responsibility**, not naming.

## Layer 1 — External Data Contract

This is the outermost layer.

Here, we simply fetch data from the backend. This can be a normal hook that calls an API and returns a response. Nothing fancy happens here.

This layer:

* Talks to the backend
* Knows the API endpoint
* Receives raw data

It does **not**:

* Clean data
* Rename fields
* Apply UI logic

This layer exists purely to respect the backend as an external system.

## Layer 2 — Data Normalization Layer

This is where things start getting interesting.

In this layer, we define TypeScript types for all the data coming from Layer 1. Since we already know what endpoints we're calling, this becomes manageable.

The responsibility here is to **protect the rest of the system from backend inconsistencies**.

This layer:

* Renames fields
* Handles `null` values and unexpected enums
* Normalizes formats such as dates, durations, and timestamps
* Maps backend data to internal meaning

This is where adapters live.

Its job is simple:

> After this layer, the backend should effectively stop existing.

## Layer 3 — Canonical Field Model

This is the most important layer.

Layer 3 defines the **meaning of a field in our system** — its type, rules, and behavior — independent of both the backend and the UI.

This layer:

* Defines the shape
* Defines the rules
* Defines the meaning

I think of this layer as a **type system plus a rulebook**.

Once a field is defined here, everything else in the system must obey it.

If a field behaves a certain way, the reason should be traceable back to this layer.

This layer does not care:

* Where the data came from
* How the field is rendered
* Which component is used

## Layer 4 — Presentation Schema

This layer answers a different question:

> How should this data be presented?

Here, we define:

* Layout structure
* Field ordering
* Visibility rules
* High-level presentation intent

I intentionally call this **Presentation Schema** instead of "UI schema" because that term is heavily overloaded.

This layer is about **structure and layout**, not business logic.

In our case, we currently have two layouts:

* A stepper layout
* Another layout that's still under development

Which layout gets used is decided here.

Based on that, styling and structure change, but the underlying field meaning remains the same.

## Layer 5 — Renderer Bridge

This is the layer that turns abstract definitions into actual UI.

The Renderer Bridge takes:

* Presentation Schema (layout intent)
* Canonical Field Model (field meaning)

And binds them to:

* Concrete UI components
* Type-safe component props

This is the **only layer** that understands both:

* Abstract UI definitions
* Real component APIs

It does not know about backend contracts.

If the backend changes and this layer breaks, something upstream is wrong.

## Layer 6 — State Orchestration Layer (React)

This is where the UI becomes alive.

This layer manages:

* State
* Reactivity
* Lifecycle
* Validation triggers

It uses React hooks to ensure rendered components stay in sync with user interactions and validation logic.

This layer is intentionally **React-specific**.

A hard rule here:

> This is the only layer that knows it's running inside React.

If we ever move to another runtime, this is the layer we rewrite.

## Why This Looked Scary at First

I won't lie.

This architecture felt overwhelming when I started.

Six layers sound like a lot.

What helped me was taking **one component at a time** and moving forward incrementally.

I didn't try to type everything perfectly from day one.

One important lesson:

> You don't need strict types for everything at the start.
>
> Start open, then tighten things as patterns stabilize.

This helped me maintain momentum instead of getting stuck trying to design the perfect system upfront.

## The Edge Case I Mentioned Earlier

Now let's talk about the edge case.

We have a **history component** where we show past operation details.

Instead of dumping every field onto the screen, we only show information that's actually useful to the user.

To handle this, I created a simple configuration file.

Each field has a boolean value:

* `true` → show the field
* `false` → hide the field

When a new requirement came in, the fix was trivial:

* Add the new field
* Set its value to `true`

That was it.

It took **literally two minutes**.

No rendering logic changed.

No state management changed.

No component refactor.

This was one of those moments where the architecture paid for itself.

## Final Thoughts

When I first started building this, I wasn't sure whether the extra complexity would be worth it.

Today, I think it was.

Not because it's perfect.

Not because every problem is solved.

But because new features can now fit into an existing system instead of forcing the system to change around them.

There are still things I want to improve.

There are probably design decisions I'll disagree with six months from now.

That's part of the process.

For now, though, this architecture has already saved us time, reduced UI work, and made adding features significantly easier.

If this gave you a different way to think about frontend architecture, I'd love to hear your thoughts.

And if you have questions or see flaws in the approach, feel free to challenge it.

Blue signing off.
