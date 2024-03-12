import { createContext, useContext } from "react";

export const userContext = createContext()
export function useUserContext() {
    const userState = useContext(userContext)
    return userState
}

export const budgetContext = createContext()
export function useBudgetContext() {
    const budgetState = useContext(budgetContext)
    return budgetState
}

export const transferenciaContext = createContext()
export function useTransferenciaContext() {
    const transferenciaState = useContext(transferenciaContext)
    return transferenciaState
}
