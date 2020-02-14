# Motivation / Goals

This is a demo app, as in, there's no real purpose behind it other than showing some
technical competency. Therefore, any sort of server-side extension to this app is purely
for my own benefit. While I do want the site to make sense, it doesn't take itself serious and
tries to adopt a modern looking interface.

# Stack so far

- NodeJS + Express
- SCSS/CSS
- JS
- HTML + Preprocessor EJS

# Todo

- [X] Figure out if I want to add a server component. **Yes**

### **Bugs**

- [ ] When running the server with nodemon and triggering the server reload (e.g. by changing the data returned to one of the routes), it takes about a minute for the browser to reload.

### **Expanding the Application:** General UI / UX + Build Systems

- [ ] Make landing page mobile compatiable
- [ ] Add short overview of company to the hero banner on landing page?
- [ ] Add more sections, (Accomplishments, History, Customers, Growth/Future, Products, Pricing)
- [ ] Add diagonals that bleed into the next section to entice user to scroll
- [ ] Maybe change navbar look, less boring.
- [X] Refactor CSS into SCSS, utilizing modules.
- [X] Figure out a nice workflow for using SCSS (preferably with SCSS modules) but not using webpack/bundler since I *probably* won't need it. -**Am using webpack plugins and SCSS modules**-
- [ ] Add parallax
- [X] Need an HTML templating engine so I can have layouts or partials, etc. Mustache maybe? -**Am using EJS**-

### **Expanding the Application:** Server-side

- [ ] Add login / user authentication (and thus add a login page)
- [ ] Restrict certain pages to only users with certain roles
- [ ] Host a relational database of mock financial data (pure SQL)
- [ ] CRUD operations
- [X] Server in: PHP, NodeJS+Express, C#+.NET Core? The server would mostly just be for API calls, it wouldn't be returning views ala MVC. *Server is in Node.js+Express*
- [ ] Use HTTP/2. (Can use [spdy](https://www.npmjs.com/package/spdy) instead of http.createServer or [relevant SO post](https://stackoverflow.com/questions/28639995/node-js-server-and-http-2-2-0-with-express-js))

### **Expanding the Application:** Admin Dashboard

- [ ] Have an admin dashboard kind of thing (some charts, maybe with d3?)

### **Expanding the Application:** Testing

#### Client Side Testing

- [ ] Selenium

#### Server Side Testing

- [ ] C# Code contracts?, NodeJS mocha / jester, phpunit