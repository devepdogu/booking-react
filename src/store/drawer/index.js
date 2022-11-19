import create from 'zustand'


export const useDrawer = create((set) => ({
    opened: false,
    setOpened: (status) => { set((state) => ({ opened: status ?? !state.opened })) }
}))


export default useDrawer;