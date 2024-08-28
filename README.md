This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environments
- node version: v18.18.2
- react version: v18
- [github](https://github.com/Full-Stack-Artisan/tzuchi-info)
- [figma link](https://www.figma.com/file/Ne4mqQd4A0Nm0t96RssUrb/%E8%B3%87%E8%A8%8A%E7%B6%B2%E7%AB%992.0-%E7%B2%BE%E7%A8%BF?type=design&node-id=304-9326&mode=design&t=1UyEvClV0mwR4qsB-0)
- [google drive asset](https://drive.google.com/drive/u/0/folders/1XD-ZpddwOLD9VlQEYG6wZSfc-Uot0QP5)
- [navigation links document](https://tzuchi365-my.sharepoint.com/:x:/g/personal/nina0425_tzuchi_org_tw/EUP2xJn9URJHni35NpUfqj4BoXCqVUSHaIJIm8O6TlERHw?rtime=BZnJkHnr20g)


First, run the development server:

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Learn More
Routes are defined in /src/app/config/routes.js


## Deploy on Tzuchi Server (testing environment)

```bash
cd /root/workspace/tzuchi-info
git pull --rebase
./build-with-env.sh -e development
./stop.sh
./start.sh
```
