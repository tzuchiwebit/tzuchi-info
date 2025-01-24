// import _ from 'lodash'
import joomlaContentCategory from './joomlaContentCategory'

export const getArticleById = async (id) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/article?id=${id}`, {
    next: { revalidate: 60*60 }, // reset data cache, after 1h, for server-side only
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}

export const getTagById = async (id) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tag?id=${id}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      // next: { revalidate: 2 }, // reset data cache
    },
  })
  return await res.json()
}

export const getRedirectJson = async () => {
  const { signal } = new AbortController()
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/jcustom/v1/redirect.json`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      // next: { revalidate: 2 }, // reset data cache
    },
  })
  return await res.json()
}

export const getArticlesByCategory = async ({label_name = '志工早會', limit = 10, offset = 0, state = 1, ordering = 'created', sort = 'desc'}) => {
  const _t = label_name.split('-')[0];
  const targetCategory = joomlaContentCategory.find((i) => i.label_name.indexOf(_t) > -1);

  if (!targetCategory) {
    throw new Error(`Invalid category : ${category}`);
  }
  const params = {
    'categoryId': targetCategory.id,
    'limit': limit,
    'offset': offset,
    'state': state,
    'ordering': ordering,
    'sort': sort,
  }

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const url = `${process.env.NEXT_PUBLIC_URL}/api/articles?${new URLSearchParams(params).toString()}`
  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}
