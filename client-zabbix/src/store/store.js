import { configureStore } from '@reduxjs/toolkit'
import reportReducer from './reportArea/reportSlice'

export default configureStore({
    reducer: {
        report: reportReducer
    }
})