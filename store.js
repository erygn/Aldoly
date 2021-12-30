import { configureStore } from '@reduxjs/toolkit'
import invoices from './slice/invoices'

export default configureStore({
  reducer: {
    invoice: invoices
  },
})