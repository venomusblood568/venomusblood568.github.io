---
title: "CORS under the hood"
date: "2025-07-02"
readTime: "3 min"
---

Recently in an interview, I was asked:  What is CORS?  and  How do you fix a CORS error?
I was able to answer that, but then a follow-up question came:  How does CORS work under the hood? 
And that’s where I got stuck.  
Honestly, I didn’t know the answer, so I told them clearly that I wasn’t sure.  
Now that I’m reading more about it, I’m thinking — why not write about this as well?

**First and foremost — What is CORS?**  
CORS (Cross-Origin Resource Sharing) is a mechanism that safely bypasses the same-origin policy. In simple terms, it allows a web page to access restricted resources from a server hosted on a different domain than the one that served the web page.

**Now, the question is — What is the same-origin policy (SOP)?**  
Under this policy, a web browser permits scripts in one web page to access data from another web page **only if both pages share the same origin**.  
Keep in mind: **An origin is defined as a combination of the URI scheme (protocol), hostname, and port number.**

Now that we understand both CORS and SOP, let’s put CORS into even simpler words:  
Imagine your backend is running on `localhost:3000` and your frontend is running on `localhost:5173`. These are considered **different origins** because of the differing ports. So, you need to tell the backend,

> "Hey! I’ll be sending requests from `localhost:5173`. Please allow it and reject requests from all other unknown URLs."

If the backend is unaware of this list (i.e., the origins you want to allow), it will throw a **CORS error**.

**To fix that:**  
We create an array (typically in the server config file) that includes all allowed frontend URLs. Then, we configure our CORS middleware (like in Express ) to accept requests only from these origins — and that solves the error.

**How CORS Works Under the Hood**
1. **Request Initialization** > when frontend makes a fetch request the browser check if this is a cross-origin request.
   -  Same Origin - no CORS involved
   -  Cross Origin - CORS kicks in

2. **Request Type Check** > Cors classifies request as GET, POST , PUT and DELETE (GET and POST are simple Requests).

3. **Preflight Request** > PUT and DELETE are considered as NON-simple Requests and request additional permission before sending the actual requests. the browser sends a OPTIONS requests.

4. **Server Checks and Response** > Now  the backend/server responds with appropriate CORS headers comes and if headers match what the browser expects, the browser proceeds. and if not the browser blocks the actual request — and you get a CORS error in the console. *Important: The browser blocks it. Not the server.

5.  **Actual Request Send** > if the preflight is accepted (or if it was a simple request), the browser now sends the actual request to the server.

6. **Server Response with CORS Headers** > To allow the browser to accept the response, the server must again include 
   **Access-Control-Allow-Origin: https://your-frontend.com**
   If this header is missing or invalid — browser blocks the response from being used by JavaScript.

Thats it that how CORS works under the hood.
happy coding....