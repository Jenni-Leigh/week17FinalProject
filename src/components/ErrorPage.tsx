import { useRouteError } from "react-router-dom"

type Props = {}
export default function ErrorPage() {
    const error = useRouteError()
    return (
        <div className="text-danger">
            { error.message || error.statusText }
        </div>
    )
}