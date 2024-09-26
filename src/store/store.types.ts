export type StateSlice<T, Actions> = T & {
    actions: Actions;
}

export interface CrudSlice<T = unknown> {
    loading: boolean;
    error: string | null;
    data: T | null;
}