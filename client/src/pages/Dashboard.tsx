import CodeEditor from '../components/CodeEditor'
import FolderTree from '../components/FolderTree'

export default function Dashboard() {
    return (
        <div id="container-page" className="max-h-screen overflow-hidden">
            <div id="container-layout" className="grid grid-cols-2 grid-rows-[1fr_auto] gap-[1%] pt-20 pr-[5%] pb-10 pl-[10%]">
                <div id="container-FolderTree" className="">
                    <FolderTree />
                </div>

                <div id="container-CodeEditor" className="">
                    <CodeEditor />
                </div>
            </div>
        </div>
    )
}

// 1250px wide is the minimum
