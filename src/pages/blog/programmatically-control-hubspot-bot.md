---
haha
---

Despite the naysayers that thought it wasn't possibe to be able to show and hide the Hubspot bot programatically (something that should really just exist in their API nonetheless), I took a stab at it. 

It looks like they've really set this thing up so that you really can't mess with it at all. Absolutely positioning it with ```!important```, that's no fun. But alas, all ye need to do is to find but a mere chink in the wall of their restrictive programming.

So I've made this...

```javascript
/**
 * @desc This file exposes a couple of functions to the global
 * scope that we can use to show and hide the hubspot bot.
 * This should be useful for when we change pages and do things where
 * we really don't want it to be shown.
 */

function showHubspotBot(timeout) {
  const show = () => {
    document.querySelector("#hubspot-messages-iframe-container").style.height =
      "92px";
    document
      .querySelector("#hubspot-messages-iframe-container")
      .classList.remove("hidden-height");
  };
  try {
    if (timeout) return setTimeout(show, timeout);
    show();
  } catch (err) {}
}

function hideHubspotBot() {
  let numRetries = 0;
  const maxRetries = 20;
  const hide = el => {
    el.style.height = "0px";
    el.classList.add("hidden-height");
  };

  const attemptHide = () => {
    const el = document.querySelector("#hubspot-messages-iframe-container");
    if (el || numRetries >= maxRetries) {
      clearInterval(hideInterval);
      log(`Found it. Clearing after ${numRetries} attempts.`);
      try {
        hide(el);
      } catch (err) {}
    } else {
      numRetries++;
      log(
        `Couldn't find the bot yet to clear it... retry attempt ${numRetries}`
      );
    }
  };
  const hideInterval = setInterval(attemptHide, 1000);
}

function log(message) {
  console.log(`[Univjobs Hubspot Bot]: ${message}`);
}

window.myHubspotBot = {
  show: showHubspotBot,
  hide: hideHubspotBot
};
```

