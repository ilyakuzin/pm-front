import { configureStore } from '@reduxjs/toolkit'
import thisUserReducer from './thisUserReducer'

export default configureStore({
  reducer: {
    thisUser:thisUserReducer
  }
})
