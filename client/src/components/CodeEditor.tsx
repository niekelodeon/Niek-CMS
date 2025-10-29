import React, { useRef, useEffect, useState, useLayoutEffect, useMemo } from 'react'
import { useAtom } from 'jotai'

import { filePathAtom, fileContentAtom, isOnFileAtom } from '../utils/atoms'

import { EditorFunctions } from '../utils/functions/EditorFunctions'

import hljs from 'highlight.js'
import '../assets/EditorTheme.css'

export default function CodeEditor() {
    const [filePath, setFilePath] = useAtom(filePathAtom)
    const [fileContent, setFileContent] = useAtom(fileContentAtom)

    const [isOnFile, setIsOnFile] = useAtom(isOnFileAtom)

    const preRef = useRef<HTMLPreElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const highlightedCode = useMemo(() => {
        const language = EditorFunctions.getLanguageFromExtension(filePath)
        try {
            return hljs.highlight(fileContent, { language }).value
        } catch {
            return hljs.highlightAuto(fileContent).value
        }
    }, [filePath, fileContent])

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
        <div id="container-editor" className="flex flex-col max-h-[85vh] max-w-[90vw]">
            <div className="overflow-auto bg-[#272334] relative">
                <pre id="highlighted" ref={preRef} spellCheck="false" className="z-1 min-w-[700px] ml-3 mt-3 whitespace-pre-wrap pointer-events-none hljs relative top-0 right-0 bottom-0 wrap-break-word">
                    <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                </pre>

                <textarea
                    id="editor"
                    ref={textareaRef}
                    spellCheck="false"
                    onChange={editorOnChange}
                    value={fileContent}
                    className="
                    overflow-hidden z-2
                    min-w-[700px]
                    ml-3 mt-3
                    text-transparent whitespace-pre-wrap
                    bg-transparent
                    border-none
                    resize-none
                    absolute top-0 left-0 right-0 bottom-0 caret-white outline-none wrap-break-word
                  "
                />
            </div>

            <div id="buttons" className="flex mt-2 gap-2">
                <button id="button-save" className="px-3 py-1 text-white bg-[#3c3854] rounded hover:bg-[#4a4564]">
                    Save
                </button>

                <button id="button-discard" className="px-3 py-1 text-white bg-[#3c3854] rounded hover:bg-[#4a4564]">
                    Discard
                </button>
            </div>
        </div>
    )
}
