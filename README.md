```
Compare the stats of all weapons in chivalry 2 with details or simplified summary.
```

## How to launch the project locally

First, you'll need to install the node_modules :

```bash
npm install
# or
yarn
```

run the development server:

```bash
npm run dev
# or
yarn dev
```

## Why

As a longtime player of Chivalry 2, I wanted to have a website that can display quickly and concisely all the stats of
the weapons in the game, and compare them. Polehammer.net is a great website to have details stats, but I wanted
something more accessible and easier to read.

## Usage

Stats are displayed as a percentage against the best and worst values out of all the weapons. If a
weapon is at 100%, it means it has the best value for this stat, and if it's at 0%, it means it has the worst value for
this stat. Some stats are considered best at a lower value, like the speed of a weapon, and some are considered best at
a higher value, like the damage. The UI reflect that.
You can also compare the stats (mainly the damage, which can vary depending on the type of weapon and the target)
against a specific class, the values will update accordingly, for the
overall best and worst values too.

## Inner working

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It used the new app
router paradigm from Next.js.

This app is 100% front as the data comes from an external library
called [chivalry2-weapons](https://www.npmjs.com/package/chivalry2-weapons)

## Pages

This project has 4 main routes for now, the homepage, which display all the weapons, the class page, which display all
the weapons of a specific class, the subclass page, which display all the weapons of a specific subclass, and the weapon
page, which display all the stats of a specific weapon. The weapon's page (will) also includes a comparator, where you
can search, and select another weapon to compare it with.
