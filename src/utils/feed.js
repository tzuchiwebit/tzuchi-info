import { Feed } from 'feed';
import fs from 'fs';
// import config from '../config';

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

    const invalidCharInXMLSpecRegexp =
        // eslint-disable-next-line no-control-regex
        /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;

    fs.writeFileSync(
        './public/rss.xml',
        feed.atom1().replace(invalidCharInXMLSpecRegexp, '')
    );
    fs.writeFileSync(
        './public/atom.xml',
        feed.atom1().replace(invalidCharInXMLSpecRegexp, '')
    );

}