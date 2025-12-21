import CodeEditor from '../components/CodeEditor'
import FolderTree from '../components/FolderTree'

export default function Dashboard() {
    return (
        <div id="container-page" className="max-h-screen overflow-hidden">
            <div id="container-layout" className="flex flex-row justify-between gap-[5%] pt-20 pr-[7%] pb-10 pl-[10%]">
                <div id="container-FolderTree" className="max-w-[25rem] min-w-[25rem]">
                    <FolderTree />
                </div>

                <div id="container-CodeEditor" className="w-full max-w-[1250px]">
                    <CodeEditor />
                </div>
            </div>
        </div>
    )
}

// 1250px wide is the minimum
