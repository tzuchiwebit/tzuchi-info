export async function generateStaticParams() {
  return [{slug: '1'}, {slug: '2'}]
}

export default function Page({ params }) {
  return <div>My Post: {params.slug}</div>
}
