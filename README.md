# React Runtime Explorations

👋 Hey there, I explored two different alternatives on how to "inject/render" a third party component into a React Application at runtime.

## Don't feel like reading?

Check this video out https://www.loom.com/share/6fff9866e5c4421d8b3979449de6a70b

## Dynamic Imports

**TL;DR:** This doesn't meet the requirements because it would require the consumers of the application to access the development version of the parent application. It was a fun exploration, Vite makes things so much easier!

**Long version** Read the [Dynamic Import Readme](https://github.com/alejandronanez/react-runtime-research/blob/main/dynamic-import/README.md)

**Veredict**
❌ This approach doesn't check all the boxes.

## iframe

**TL;DR** This meets all the requirements! It doesn't give you _the best_ developer experience, but gets the job done.

**Long version** Read the [iframe Readme](https://github.com/alejandronanez/react-runtime-research/blob/main/iframe/README.md)

**Veredict**
✅ This approach checks all the boxes.

## Other approaches worth taking a look at

I think that [Module Federation](https://module-federation.github.io/) could solve this problem in a more elegant way as it doesn't have the limitations that the iframe solution has. The caveat is that you'd have to work closely with the engineers on the parent application team in order to configure the remotes for your application.
