import CodeEditor from '../components/CodeEditor'
import FolderTree from '../components/FolderTree'

export default function Dashboard() {
    return (
        <div id="container-page" className="min-height-full">
            <div id="container-layout" className="grid grid-cols-2 grid-rows-[1fr_auto] min-height-full px-30 pt-15">
                <div id="container-folderTree" className="">
                    <FolderTree />
                </div>

                <div id="container-codeEditor" className="">
                    <CodeEditor />
                </div>
            </div>
        </div>
    )
}
