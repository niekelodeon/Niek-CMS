import React, { useRef, useEffect, useState, useLayoutEffect, useMemo } from 'react'
import { useAtom } from 'jotai'

import { currentPathAtom, fileContentAtom, isOnFileAtom } from '../utils/atoms'

import { EditorFunctions } from '../utils/functions/EditorFunctions'

import hljs from 'highlight.js'
import '../assets/EditorTheme.css'

export default function CodeEditor() {
    const [currentPath, setCurrentPath] = useAtom(currentPathAtom)
    const [fileContent, setFileContent] = useAtom(fileContentAtom)

    const [isOnFile, setIsOnFile] = useAtom(isOnFileAtom)

    const preRef = useRef<HTMLPreElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const highlightedCode = useMemo(() => {
        const language = EditorFunctions.getLanguageFromExtension(currentPath)
        try {
            return hljs.highlight(fileContent, { language }).value
        } catch {
            return hljs.highlightAuto(fileContent).value
        }
    }, [currentPath, fileContent])

    function editorOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setFileContent(e.target.value)
    }

    useLayoutEffect(() => {
        if (preRef.current && textareaRef.current) {
            const pre = preRef.current
            const textarea = textareaRef.current

            const newHeight = pre.clientHeight
            const newWidth = pre.clientWidth - 5

            textarea.style.height = `${newHeight}px`
            textarea.style.width = `${newWidth}px`
        }
    }, [highlightedCode])

    return (
        <div id="container-editor" className="flex max-h-[85vh] w-full flex-col gap-10">
            <div className="relative max-h-[75vh] min-h-[75vh] overflow-auto bg-[#272334]">
                <pre id="highlighted" ref={preRef} spellCheck="false" className="hljs pointer-events-none relative top-0 right-0 bottom-0 z-1 mt-3 ml-3 min-h-[24px] min-w-[700px] wrap-break-word whitespace-pre-wrap">
                    <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                </pre>

                <textarea
                    id="editor"
                    ref={textareaRef}
                    spellCheck="false"
                    onChange={editorOnChange}
                    value={fileContent}
                    className="absolute top-0 right-0 bottom-0 left-0 z-2 mt-3 ml-3 min-h-[24px] min-w-[700px] resize-none overflow-hidden border-none bg-transparent wrap-break-word whitespace-pre-wrap text-transparent caret-white outline-none"
                />
            </div>

            <div id="buttons" className="mt-2 flex gap-2">
                <button id="button-save" className="rounded bg-[#3c3854] px-3 py-1 text-white hover:bg-[#4a4564]">
                    Save
                </button>

                <button id="button-discard" className="rounded bg-[#3c3854] px-3 py-1 text-white hover:bg-[#4a4564]">
                    Discard
                </button>
            </div>
        </div>
    )
}
