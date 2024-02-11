# auction-api

## Setup and run project
1. run < npm install >
2. configure .env file by .env.example
3. run < npm run start > for production
4. run < npm run dev > for development

## Migrations for the database

1. run < npx prisma migrate dev --name migration_name >
2. run < npx prisma generate >


## This project is API for hackathon INT20H 2024 (WebDevelopment task)

### Main functional requirements:
1. Creating and managing auctions. Ability to create an auction with a description, photos and starting price. Ability to edit auction parameters. Page for viewing all auctions.
2. Bidding system. A mechanism that allows users to place bids. Auction and bid data should be automatically updated when the page is reloaded. 
3. Displaying bid history and active bidders.
4. Sorting and filtering. Display all active auctions sorted by various criteria, such as price. Implement the ability to search for other auctions and add filters for searching.

