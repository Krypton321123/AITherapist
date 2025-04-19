import { create } from 'zustand'

interface userStoreInterface {
    data: {
        goal: string 
        gender: string | null
        age: number | null
        sleepQuality: string 
        medication: boolean
    }
    updateData: (newData: any) => void 
}

export const useUserStore = create<userStoreInterface>()((set) => ({
    data: {
        goal: '', 
        gender: '',
        age: null, 
        sleepQuality: '', 
        medication: false
    },
    updateData: (newData) => set((state) => ({
        data: {...state.data, ...newData}
    }))

}))