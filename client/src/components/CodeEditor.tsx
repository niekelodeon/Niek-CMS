import React, { useRef, useEffect, useState, useLayoutEffect, useMemo } from 'react'
import { useAtom } from 'jotai'

import { currentPathAtom, fileContentAtom, isOnFileAtom } from '../utils/atoms'

import { FolderTreeTools } from '../utils/functions/TreeFunctions'

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

    async function saveCode(currentPath: string, fileContent: string) {
        FolderTreeTools.saveFile(currentPath, btoa(fileContent))
    }

    async function discardCode() {
        const fileContent: any = FolderTreeTools.getFile(currentPath)
        setFileContent(fileContent)
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
        <div id="container-editor" className="flex max-h-[85vh] w-full flex-col gap-5">
            <div className="relative max-h-[75vh] min-h-[75vh] overflow-auto rounded-md bg-[#272334]">
                <pre id="highlighted" ref={preRef} spellCheck="false" className="hljs pointer-events-none relative top-0 right-0 bottom-0 z-1 mt-3 ml-3 min-h-[24px] min-w-[600px] wrap-break-word whitespace-pre-wrap">
                    <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                </pre>

                <textarea
                    id="editor"
                    ref={textareaRef}
                    spellCheck="false"
                    onChange={editorOnChange}
                    value={fileContent}
                    className="absolute top-0 right-0 bottom-0 left-0 z-2 mt-3 ml-3 min-h-[24px] min-w-[60px] resize-none overflow-hidden border-none bg-transparent wrap-break-word whitespace-pre-wrap text-transparent caret-white outline-none"
                />
            </div>

            <div id="buttons" className="mt-2 flex gap-5">
                <button
                    id="button-save"
                    className="cursor-pointer rounded-md bg-[#7F7EFF] px-4 py-1.5 font-medium text-white transition-colors hover:bg-[#5D5CC9]"
                    onClick={() => {
                        saveCode(currentPath, fileContent)
                    }}
                >
                    Save
                </button>

                <button
                    id="button-discard"
                    className="cursor-pointer rounded-md bg-[#7F7EFF] px-4 py-1.5 font-medium text-white transition-colors hover:bg-[#5D5CC9]"
                    onClick={() => {
                        discardCode()
                    }}
                >
                    Discard
                </button>
            </div>
        </div>
    )
}
