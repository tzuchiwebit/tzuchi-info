const API_ENDPOINT = `${process.env.NEXT_PUBLIC_CMS_URL}/api/index.php/v1`
const token = process.env.NEXT_PUBLIC_JOOMLA_API_TOKEN

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const params = { }

  if (searchParams.get('categoryId')) params['filter[category]'] = searchParams.get('categoryId')
  if (searchParams.get('limit')) params['page[limit]'] = searchParams.get('limit')
  if (searchParams.get('offset')) params['page[offset]'] = searchParams.get('offset')
  if (searchParams.get('state')) params['filter[state]'] = searchParams.get('state')
  params['list[ordering]'] = searchParams.get('ordering') || 'created'
  params['list[direction]'] = searchParams.get('sort') || 'desc'

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const url =`${API_ENDPOINT}/content/articles?${new URLSearchParams(params).toString()}`
  const res = await fetch(url, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
