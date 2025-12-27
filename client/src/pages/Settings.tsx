import Connections from '../components/Connections'

export default function Settings() {
    return (
        <div id="container-page" className="max-h-screen overflow-hidden">
            <div id="container-layout" className="h-full">
                <div className="container-settings">
                    <Connections />
                </div>
            </div>
        </div>
    )
}
