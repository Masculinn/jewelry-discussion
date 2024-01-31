# This is a [Next.js](https://nextjs.org/) Project built by Burak Bilen using OOP [React]('react.js)

## Getting Started

First, download node environment [by pressing this link]('https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi'):

Second creating next.js project using Terminal 

```bash
npx create-next-app@latest
```

Third making the steps as follows

- Set the project name
- TypeScript *No*
- EsLint *No*
- Tailwind CSS *Yes*
- /src directory *Yes*
- App Router *No*
- Import alias *No*

_And then open the created folder into code editor_

## Executing project

- Navigate to terminal and write

  ```bash
  npm run dev
  ```
The project going to run on `localhost:3000` as default 

And then please clone the repository.

## Implementing 

- Firstly, create `.env.local` file at the top of the root of folder.
- Secondly, write the API credentials that store application datas

```bash
NEXT_PUBLIC_SUPABASE_URL=https://krqbxwgmyzijzsjjukyo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycWJ4d2dteXppanpzamp1a3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxMjY0NzMsImV4cCI6MjAyMTcwMjQ3M30.LqWJMr7SfmanzJzpM3ngPf09j4yG5zt01H7GwTddi-8
JWT_SECRET=vJnKCfvEFmKdxzFS6b622cS5/1S4D1RU4mVSTTV/TwAzyu8jtzyTfPF9+j5vQyh9IWZ5dJlTf5J5TBE05rlXwA==
```

## Conclusion 

After making this all steps you should be able to have a root directory as

```bash
|-- .next
|-- node_modules
|-- public
|-- src
|-- .env.local
|-- .gitignore
|-- jsconfig.json
|-- next.config.mjs
|-- package.json
|-- package-lock.json
|-- postcss.config.js
|-- tailwind.config.js
|-- README.md
```

After implementing whole data and doing the appropriate hierarchy you can execute the code by writing `npm run dev`

