---
title: "I Was Reopening the Same 7 Websites Every Day"
date: "2025-07-02"
readTime: "3 min"
tags: ["productivity", "devtools", "sideproject"]
---

So recently I have been facing one major issue, and honestly, it has been really annoying.

But being a developer definitely has its perks. Sometimes you can solve your own problems instead of depending on someone else's solution.

Now, let's see what the problem was.

## The Problem

The main device I use for work and pretty much everything else is a MacBook M1, which I've been using for years now. After a recent macOS update, the RAM seems to fill up much faster than before.

Because of that, I can handle a lot fewer applications at the same time. I constantly have to close apps and even browser tabs just to keep the system running smoothly.

That part is fine.

The annoying part is that there are around 5–7 tabs that I use every single day:

- Slack
- Notion
- Linear
- YouTube
- Claude
- ChatGPT
- GitHub

Closing them helps save RAM and improves performance, but opening them again and again is painful. Typing URLs, searching through bookmarks, or finding the right tab every time is slow.

And when you do it dozens of times a day, it becomes surprisingly frustrating.

## Building a Launcher

After dealing with this for a while, I got tired of repeatedly opening the same websites every day.

So I built a small website launcher for myself.

> The idea is simple: instead of searching through bookmarks or typing URLs, I can assign short aliases to the websites I use most often and open them instantly.

For example:

```text
s  -> Slack
l  -> Linear
gm -> Gmail
tw -> Company GitHub Repo
tl -> Company GitHub Project
```

### Launching It

To launch it, I just press:

`Shift + Command + Space`

This opens a small search bar where I can type an alias and jump directly to the website I need.

### Built-in Commands

I also added a few built-in commands:

```text
/add
/list
/delete
/theme
/info
/help
```

## The Result

Now it's much easier to navigate between tools.

I can close tabs whenever I want, save RAM, keep the browser lighter, and still open everything I need within a second or two.

If you want to try it yourself, check out the repository below:

GitHub Repository: [Dash](https://github.com/venomusblood568/dash)

Before I end, I know there are probably extensions and applications that already solve this exact problem.

But what kind of software developer would I be if I didn't build a tool for myself first?

Anyway, feel free to check it out and let me know what you think.

Bye bye, and happy coding, happy learning.