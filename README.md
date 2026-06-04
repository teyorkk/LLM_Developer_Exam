## Step by step guide on how to run this project

1. Create database with MSSQL
2. on cli npm install / pnpm install for both frontend and backend directory
3. create .env file on the root directory of backend configure your connection string (DATABASE_URL) or just use the one in env file (i've exposed it for easier testing just change the password) and your JWT_SECRET token
4. on cli change directory to backend then npx prisma migrate deploy on backend directory
5. on cli npm run dev/ pnpm dev for both front end and backend directory
6. frontend runs on http://localhost:5137 while backend runs on http://localhost:5000

## Challenges encountered

1. I'm new to MSSQL so configuring it is quite new to me. I want to practice on not using GUI in database like pgAdmin and MySQL workbench. I installed MSSQL but the server only. Navigating through it is quite painful since I always forget on inputting the GO word and finding the table and db names are not like postgre and mysql where its easier. But I've gone through it with the help of Gemini Ai I navigated through it with little to no problem.
2. I want to try prisma orm as I was developing this. I say that I encountered some time configuring it. But it was all worth it since I get to try this prisma orm that has been in my list of technologies that I want to learn and I might say that I use it quite well.
3. Frontend development is not my primary focus, so I concentrated more on backend architecture and API development. However, I still implemented a functional UI to support integration, testing, and end-to-end system validation. AI-assisted development tools (Cursor) were used to speed up UI scaffolding and debugging while ensuring proper understanding and manual adjustments of the code.

## Technoligies Used

# Frontend

- Typescript
- React (vite)
- Ant design

# Backend

- Javascript
- ExpressJs
- MSSQL
- JWT
