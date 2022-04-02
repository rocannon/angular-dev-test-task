import { createAction, props } from "@ngrx/store";


export const showError = createAction('[App] Show Error', props<{errorMessage: string}>());

export const updateQueryParams = createAction('[App] Update QueryParams', props<{ params: Record<string, unknown>}>());