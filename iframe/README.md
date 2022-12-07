# iFrame Approach (Draft)

- This seems to be the most straightforward approach to "render something" inside the parent application.
- The communication needs to be done through messages. Right now, the apps communicate through the `"message"` message, I want to investigate how to trigger custom events. This looks like a good start https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
- I think that I can get the parent application to behave in a certain way if I get it to listen to certain events from its children