# Eclipse - League of Legends Stats App

A web app for looking up League of Legends summoner profiles and match history, similar to op.gg.

## Features

- Search any summoner by name, tag, and region
- View rank, winrate, and LP
- Detailed match history with KDA, CS, items, runes, and summoner spells
- Full 10-player match breakdown with blue and red team stats

## Future Features

- Champion winrates based on role.
- Live game viewer with build suggestion, winrate based on match-ups.

## Tech Stack

- **Frontend:** React, Vite, React Router
- **Backend:** Node.js, Express
- **Data:** Riot Games API, Data Dragon (CDN)

## Screenshots

![App Demo](ezgif-166e63dbe641920c.gif)

## How to Run Locally

1. Clone the repo
2. Add your Riot API key to the backend
3. Run the backend: `cd summonerInfo && npm install && npm start`
4. Run the frontend: `cd reactJavas && npm install && npm run dev`
5. Open `http://localhost:5173`
