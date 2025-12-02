import { atom } from 'jotai'

import { Node, Actions } from '../utils/interfaces'
import type { FolderData } from '../utils/interfaces'

export const selectedProjectAtom = atom<string>('') // the path relative to the users folder

export const folderTreeAtom = atom<Node<FolderData>>()

export const currentPathAtom = atom<string | null>('')
export const currentNodeAtom = atom<Node<FolderData>>()

export const fileContentAtom = atom<string>('')

export const isOnFileAtom = atom<boolean | null>()

export const currentActionAtom = atom<Actions | null>()

export const resultMessagesAtom = atom<string[]>([])
