---
title: "Microservices: What?"
date: "2025-10-12"
readTime: "3 min"
---

# Understanding Microservices Architecture

I really don’t remember when I first came across this term, but being a nerd who loves to explore, I stumbled upon a few articles and videos — and now I finally understand what **Microservices Architecture** is and why we even need it in the first place. So, let’s begin.


## Stepping Back: What Is Monolithic Architecture?

Before diving into microservices, let’s take a step back and understand what **Monolithic Architecture** actually means.

Monolithic architecture is a software design model where all components — such as the **user interface**, **business logic**, and **data access layer** — are combined into a single, unified codebase that runs as one unit.

To be honest, this architecture works perfectly fine for **small to medium-sized projects**, **side projects**, and even **MVPs (Minimum Viable Products)** or small internal tools.  
But this approach starts to **fall apart as the project scales**, especially at the level of companies like **Spotify** or **Netflix**.

To get a clearer picture, let’s look at the **advantages and disadvantages** of the monolithic approach.


## Advantages


- **Easier to Develop** — Everything is in one place, so setting up and starting development is quick and straightforward.  
- **Easier to Maintain** — A single codebase means fewer moving parts to keep track of.  
- **Single Codebase & Easier to Understand** — Developers can see the whole system in one view, making debugging simpler.  
- **Tightly Coupled** — All parts work together smoothly, reducing communication overhead.  
- **Easier to Deploy** — You just deploy one big application — no need to manage multiple services.  


&nbsp;
## Disadvantages

- **No Independent Development** — Teams can’t work on separate parts without stepping on each other’s code.  
- **No Independent Deployment** — You have to redeploy the entire app even for a small change.  
- **Limited Scaling** — You can’t scale specific parts; you have to scale the whole thing, which wastes resources.  
- **Limited Technology Flexibility** — You’re stuck with one tech stack across all modules.  

Now you can see the problems with monolithic architecture.  
To fix these issues, **Microservices Architecture** was introduced — and companies like **Netflix** and **Spotify** were among the first to adopt it successfully.


## What Are Microservices?

By definition, **Microservices** are an architectural approach to building applications as a **collection of small, independent services** that communicate with each other over a network.

Basically, microservices were created to **overcome the limitations** of monolithic systems.  
But, as we all know, with every advantage comes a set of new challenges.


## Disadvantages of Microservices

- **Complex to Code** — Managing multiple independent services can get messy.  
- **Complex to Maintain** — Keeping track of different versions and deployments is challenging.  
- **Hard to Understand the Overall Codebase** — Since each service is independent, it’s tough to see the whole picture.  
- **Management Overhead** — Requires proper coordination between multiple teams and services.  
- **High Infrastructure Costs** — Running and maintaining several services increases cloud and operational costs.  


## How Much Should We Break Into Microservices?

Honestly, there’s **no fixed rule** for how much you should break your application into microservices.  
It depends on your **business logic**, **requirements**, and how you want to **structure** your system.  

Most companies keep this information private — so only internal teams really know how their microservices are divided.


## How Do Microservices Interact With Each Other?

You might think, “Okay, we’re dividing the features into smaller projects — but how do they talk to each other?”

There are a few common methods:

1. **Synchronous Communication** — The classic way, where one service calls another via **APIs** (like REST or gRPC).  
2. **Asynchronous Communication** — Services communicate using **message brokers** such as **Apache Kafka**, without waiting for an immediate response.  
3. **Service Mesh** — A modern approach (like **Kubernetes with Istio**) that manages how services communicate, adding **security, monitoring, and reliability**.  


## Final Thoughts

Microservices are not a silver bullet — they solve scaling and flexibility issues, but introduce their own complexity.  
For small teams or early-stage projects, a **monolith** might still be the right choice.  
But as your system grows in size and complexity, **microservices give you the power to scale, innovate, and deploy faster** — if managed well.

> “In the end, it’s not about choosing monolith or microservices — it’s about choosing what fits your current needs and future goals.”

I’ll leave you with this line — **sayonara**, and as always: **Keep learning, keep coding.**
