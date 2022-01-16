import { createContext } from 'solid-js'
import { CurrentTableContextValue } from './CurrentTableContextValue'

export const CurrentTableContext = createContext<CurrentTableContextValue>([() => null, () => {}])
