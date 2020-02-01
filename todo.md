# Motivation / Goals

This is a demo app, as in, there's no real purpose behind it other than showing some
technical competency. Therefore, any sort of server-side extension to this app is purely
for my own benefit. While I do want the site to make sense, it doesn't take itself serious and
tries to adopt a modern looking interface.

# Todo


- [ ] Figure out if I want to add a server component

### **Expanding the Application:** General UI / UX

- [ ] Make landing page mobile compatiable
- [ ] Add short overview of company to the hero banner on landing page?
- [ ] Add more sections, (Accomplishments, History, Customers, Growth/Future, Products, Pricing)
- [ ] Add diagonals that bleed into the next section to entice user to scroll
- [ ] Maybe change navbar look, less boring.
- [ ] Refactor CSS into SCSS, utilizing modules.
- [ ] Figure out a nice workflow for using SCSS (preferably with SCSS modules) but not using webpack/bundler since I *probably* won't need it
- [ ] Add parallax

### **Expanding the Application:** Server-side

- [ ] Add login / user authentication (and thus add a login page)
- [ ] Restrict certain pages to only users with certain roles
- [ ] Host a relational database of mock financial data (pure SQL)
- [ ] CRUD operations
- [ ] Server in: PHP, NodeJS+Express, C#+.NET Core? The server would mostly just be for API calls, it wouldn't be returning views ala MVC.

### **Expanding the Application:** Admin Dashboard

- [ ] Have an admin dashboard kind of thing (some charts, maybe with d3?)

### **Expanding the Application:** Testing

#### Client Side Testing

- [ ] Selenium

#### Server Side Testing

- [ ] C# Code contracts?, NodeJS mocha / jester, phpunit