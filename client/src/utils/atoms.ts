import { atom } from 'jotai'

export const selectedProjectAtom = atom<string>('') // the path relative to the users folder
export const folderPathAtom = atom<string>('')
export const filePathAtom = atom<string>('')
export const fileContentAtom = atom<string>('')
export const isOnFileAtom = atom<null | boolean>()
export const resultMessagesAtom = atom<string[]>([])
