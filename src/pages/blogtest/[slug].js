import { useRouter } from 'next/router'

export default function Page({ }) {
  const router = useRouter()
  return <p className="pt-10">Post: {router.query.slug}</p>
}
