# updat-eta


Event based multi-user ETA tracker.

Originally conceptualized in April 2016 at the AT&T Mobile App and IoT Hackathon and it made use of the AT&T M2X.

The current version is built using Node.js and Socket.IO.

####Demo:

[Version 1](https://goo.gl/suA71P)

[Version 2](https://goo.gl/Cbwbt0)


####Instructions:

1) Install [Node.js](https://nodejs.org/en/download/)

2) In the terminal, navigate to project folder and type:

```
    npm install

    node app.js
```
3) In track.html, replace <enter-maps-api-key> with your [key](https://developers.google.com/maps/documentation/javascript/get-api-key)

4) Open http://localhost:3000/ in your browser.

5) Try the demo !

Note: You can open multiple browser windows and check the behavior.


####TO DO:

- [ ] Modify the code to get user's current location.

- [x] Generate unique URL's that will reflect a unique session which the host user can share with others.
