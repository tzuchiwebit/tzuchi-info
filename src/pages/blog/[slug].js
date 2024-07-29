import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'

export default function Page({ }) {
  const router = useRouter()

  const params = useParams();
  return <>
  <p className="pt-10">PostPostPostPostPost</p>
    <p className="pt-10">Post: {router.query.slug}</p>
    <p className="pt-10">React router dom: {params?.slug}</p>
  </>
}
