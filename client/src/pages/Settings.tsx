import Connection from '../components/Connection'
import RemoteStructure from '../components/RemoteStructure'

export default function Settings() {
    return (
        <div id="container-page" className="max-h-screen overflow-hidden">
            <div id="container-layout" className="h-full">
                <div className="container-connection">
                    <Connection />
                </div>

                <div id="container-remoteStructure">
                    <RemoteStructure />
                </div>
            </div>
        </div>
    )
}
