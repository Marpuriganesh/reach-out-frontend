/* eslint-disable @typescript-eslint/no-unused-vars */
import {configureStore} from '@reduxjs/toolkit'
import authReducers from './authSlice'
import redditReducers from './reddit'


const store = configureStore({
    reducer:{
        auth:authReducers,
        reddit:redditReducers
    }
})


export type AppDispatch = typeof store.dispatch

export default store
export type RootState = ReturnType<typeof store.getState>