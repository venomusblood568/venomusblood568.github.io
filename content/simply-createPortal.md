---
title: "Simply createPortal"
date: "Dec 30, 2025"
readTime: "3 min"
---

# Simply createPortal

Have you ever tried creating a simple popup? Like a clean modal in the center with a nice blurred background?

If you haven't, trust me - it sounds simple, but it's a real pain.

First, the layout shifts. Then the background blur doesn't apply properly. Then you realize everything is wrapped inside five different components, each with its own stacking context.

Now you're fighting z-index values like it's a boss battle.

You finally think you fixed it… And then you notice the very top of the page is still not blurred.

At that point, you're not even mad - you're just tired.

I hit this problem while already dealing with multiple layouts, and honestly, I didn't want one more UI issue to show up. So instead of hacking around more CSS, I decided to read a bit and try different approaches.

That's when I found createPortal in React.

And yeah - this thing just works.

I've used it in multiple places in my frontend since then.

The best part? createPortal doesn't care about your component hierarchy. It doesn't care about z-index battles or layout constraints. It simply renders your popup at the top level of the document (or any target you choose).

No layout shifts. No weird stacking bugs. No "why is this div still behind that header?" moments.

You just call it, use it, and you're done. Your popup stays on top - exactly where it should be.

## Formal definition (for people who want it)

createPortal is a React API that lets you render a component outside of its parent DOM hierarchy, while still keeping it part of the same React component tree.

## A Simple Example

I'll create a simple popup example to show how this works:
```tsx
import React, { useState } from "react";
import { createPortal } from "react-dom"; //just call from react-dom

export default function App() {
  const [open, setOpen] = useState(false); //define the state
  
  // main app where you are calling the component
  return (
    <>
      <button
        className="m-6 rounded bg-black px-4 py-2 text-white"
        onClick={() => setOpen(true)}
      >
        Open
      </button>
      {open && <Popup onClose={() => setOpen(false)} />}
    </>
  );
}

// component function
function Popup({ onClose }: { onClose: () => void }) {
  // you can use root or document 
  const root =
    document.getElementById("portal-root") ??
    document.body.appendChild(
      Object.assign(document.createElement("div"), { id: "portal-root" })
    );
  
  //this is overlay you want to show
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="rounded bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        Popup
      </div>
    </div>,
    root // then call here just after the div where your component ends
  );
}
```

And if you do everything right, you'll end up with a clean, simple popup - no layout shifts, no weird behavior.

Give createPortal a try and see how it feels in your own project.

If you have any other small tips or nuggets like this, I'd love to hear them.

Happy coding.

Blue, signing off