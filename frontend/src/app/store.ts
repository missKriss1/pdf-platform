import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PURGE,
    REGISTER,
    REHYDRATE,
    PERSIST,
} from "redux-persist";
import {foldersReducer} from "@/features/folders/foldersSlice.tsx";
import {filesReducer} from "@/features/files/fileSlice.tsx";


const rootReducer = combineReducers({
    folders: foldersReducer,
    files: filesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;