const API_ENDPOINT = `${process.env.NEXT_PUBLIC_CMS_URL}/api/index.php/v1`
const token = process.env.NEXT_PUBLIC_JOOMLA_API_TOKEN

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  console.log('API_ENDPOINT', API_ENDPOINT)
  console.log('token', token)

  // FIXME: unable to verify the first certificate
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const url =`${API_ENDPOINT}/content/articles/${id}`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
  const data = await res.json()
  console.log('data', data)

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
