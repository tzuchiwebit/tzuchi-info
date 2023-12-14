import { Feed } from 'feed';
import fs from 'fs';
// import config from '../config';

const posts = [
    {
        title: '慈濟資訊網',
        id: 'https://comm2.tzuchi-org.tw/',
        link: 'https://comm2.tzuchi-org.tw/',
        url: 'https://comm2.tzuchi-org.tw/',
        description: 'descriptions 慈濟資訊網 ',
        content: 'contents 慈濟資訊網',
        image: 'https://picsum.photos/200',
        date: new Date(),
    },
    {
        title: 'Title',
        id: process.env.SITE_URL,
        link: process.env.SITE_URL,
        description: 'descriptions ',
        content: 'contents',
        image: 'https://picsum.photos/200',
        date: new Date(),
    },
    {
        title: 'Title',
        id: process.env.SITE_URL,
        link: process.env.SITE_URL,
        description: 'descriptions ',
        content: 'contents',
        image: 'https://picsum.photos/200',
        date: new Date(),
    },
]

export const generateRSS = async () => {
    const feed = new Feed({
        title: process.env.TITLE,
        description: process.env.SUBTITLE,
        id: process.env.SITE_URL,
        link: process.env.SITE_URL,
        image: `${process.env.SITE_URL}/image.png`,
        favicon: `${process.env.SITE_URL}/favicon.ico`,
        copyright: `© ${new Date().getFullYear()} ${process.env.TITLE}. All rights reserved.`,
        feedLinks: {
            atom: `${process.env.SITE_URL}/atom.xml`,
        },
    });

    posts.forEach(post => {
        feed.addItem({
            title: post.title,
            id: post.url,
            link: post.url,
            description: post.description,
            content: post.content,
            author: [
                {
                    name: "Garry",
                    email: "garry@example.com",
                    link: "https://example.com/garry"
                },
            ],
            contributor: [
                {
                    name: "Bruce",
                    email: "bruce@example.com",
                    link: "https://example.com/bruce"
                },
            ],
            date: post.date,
            image: post.image
        });
    });

    feed.addCategory("Technologie");

    feed.addContributor({
        name: "Johan Cruyff",
        email: "johancruyff@example.com",
        link: "https://example.com/johancruyff"
      });


    const invalidCharInXMLSpecRegexp =
        // eslint-disable-next-line no-control-regex
        /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;

    fs.writeFileSync(
        './public/rss.xml',
        feed.rss2().replace(invalidCharInXMLSpecRegexp, '')
    );
    fs.writeFileSync(
        './public/atom.xml',
        feed.atom1().replace(invalidCharInXMLSpecRegexp, '')
    );

}