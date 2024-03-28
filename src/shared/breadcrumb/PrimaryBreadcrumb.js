import Icon from "../Icon"

const PrimaryBreadcrumb = ({ items = [], separator = <Icon.PageArrowRight style={{ width: 16 }} /> }) => {

    return <div className="w-full flex gap-1 items-center text-gray-gray2">
        {
            items.map((i, index) => (<>
                <div key={index} className="font-medium">
                    {i.label}
                </div>
                {
                    index < items.length - 1 ? <div className="font-medium">
                        {separator}
                    </div> : <></>
                }
            </>))
        }
    </div>

}

export default PrimaryBreadcrumb