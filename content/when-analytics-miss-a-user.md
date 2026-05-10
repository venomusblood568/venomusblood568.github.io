---
title: "When Analytics Miss a User"
date: "2026-01-18"
readTime: "3 min"
---

So recently we noticed something weird.
One user was clearly using the product, but in analytics it was almost blank. No proper events, no device info, nothing. We had zero clue what that person was doing.

We already solved this kind of thing on iOS and Android, so web was the only one left.

My boss suggested something simple. Instead of depending only on tracking tools, why not try to get some basic data directly from the user’s browser.

I looked into it. React does have a built-in way using user-agent–derived data. It works, but the output felt very raw. Also, modern browsers intentionally reduce precision or even lie. So the data is not fully reliable, which makes you question the point of using it in the first place.

Before going further, we defined the minimum we actually needed:

device type (desktop, tablet, mobile)
OS (macOS, Windows, etc.)
browser family (Chrome, Safari, Chromium)
Nothing fancy.

Become a member
After checking a few options, I came across an npm package called bowser. Setup was fairly easy and the parsed output was much cleaner compared to raw user-agent data.

It’s still not perfect, and it won’t magically track everything. But for our use case, it filled a blind spot.

I’ve added the setup code and a screenshot of the output below.

```tsx
// This is the bare bone i used
import Bowser from "bowser"; // import the package

// we want to send data to backend only the name and os type for now.
type DevicePayload = {
  name: string;
  os: string;
};

// mapping the names in the format we want
function getDesktopName(osName?: string) {
  if (osName === "macOS") return "Mac • Desktop";
  if (osName === "Windows") return "Windows • Desktop";
  if (osName === "Linux") return "Linux • Desktop";
  return "Desktop";
}

// for case like if we dont know more like linux and all. 
// the percentage of user that use are less so we are ignore for now
export function getDevice(): DevicePayload {
  if (typeof window === "undefined") {
    return {
      name: "Unknown",
      os: "Unknown",
    };
  }
  
  // call the bowser this is boiler code you can use
  const parser = Bowser.getParser(navigator.userAgent);
  const os = parser.getOS()?.name ?? "Unknown";
  const deviceType = parser.getPlatformType(true); // desktop | mobile | tablet

  let name = "Unknown";

  if (deviceType === "desktop") {
    name = getDesktopName(os);
  } else if (deviceType === "mobile") {
    name = `${os} • Mobile`;
  } else if (deviceType === "tablet") {
    name = `${os} • Tablet`;
  }
  
  // return the output.
  return {
    name,
    os,
  };
}

```

This is something I just learned, so I thought I’d share.
If you know better tools or approaches, let me know.

Blue signing off.