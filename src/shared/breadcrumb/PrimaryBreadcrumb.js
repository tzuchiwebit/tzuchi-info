import Icon from "../Icon"
import { useRouter } from "next/navigation"

const PrimaryBreadcrumb = ({ items = [], separator = <Icon.PageArrowRight style={{ width: 16 }} /> }) => {

    const router = useRouter();

    return <div className="w-full flex gap-1 items-center text-gray-gray2">
        {
            items.map((i, index) => (<div key={index} className="flex items-center gap-1">
                <div className="font-medium cursor-pointer hover:text-gray-gray4" onClick={() => {
                    router.push(i.link)
                }}>
                    {i.label}
                </div>
                {
                    index < items.length - 1 ? <div className="font-medium">
                        {separator}
                    </div> : <></>
                }
            </div>))
        }
    </div>

}

export default PrimaryBreadcrumb