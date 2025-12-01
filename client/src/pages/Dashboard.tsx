import CodeEditor from '../components/CodeEditor'
import FolderTree from '../components/FolderTree'

export default function Dashboard() {
    return (
        <div id="container-page" className="min-height-screen">
            <div id="container-layout" className="grid grid-cols-2 grid-rows-[1fr_auto] gap-[4rem] pl-[10%] pr-[5%] pt-20 pb-15">
                <div id="container-folderTree" className="height-screen">
                    <FolderTree />
                </div>

                <div id="container-codeEditor" className="height-screen">
                    <CodeEditor />
                </div>
            </div>
        </div>
    )
}

// 1250px wide is the minimum
