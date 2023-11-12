# DontBoard
An Online Public Board website

This project can be thought of *DontPad.com + PureRef*

*PureRef* is a Desktop software where you can Drag-And-Drop images, move, re-scale and delete them as you see fit
It can be described as 'digital image board'

*DontPad.com* is a website that saves notepads. Users can add whatever 'name' to the end of the URL
  - If the page exists, it's content will be loaded
  - If it doesn't exist, a blank one will be created

DontBoard fuses these ideas: a webpage where you can drag-and-drop media files (images, plus videos and audio) Add, move and delete as you see fit
Perhaps PureRef is now part of Atwood's law

---

How to start:

As of right now all you need to do is run `npm start` at the 'front-end' folder
You'll need *NodeJs* and *TypeScript* installed, naturally

---

Future:

The project's repository is made public. The future enhancements are available at 'Issues'

But to summarize, the idea is to have:

  - *Back-end*: *.NET Core* to host the website and fetch API CRUD requests for the Media files
    - Tests: XUNIT
  - Database: *MongoDB*
  - *Front-end*: *React* with *Typescript*

  All dockerized

Either put the website online via a cloud service or making a home server

At first, all webpages will be public, just like in DontPad.com. Meaning, your created page can be tempered with by someone else but hey, never look a gift horse in the mouth
I'm thinking of letting users create accounts to make webpages with Authentication and Authorization, but thats for later
Besides, there's also the question of storage size