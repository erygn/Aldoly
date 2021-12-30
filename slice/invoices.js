import { createSlice } from "@reduxjs/toolkit";

export const invoices = createSlice({
    name: 'invoice',
    initialState: {
        invoice: [],
        totalInvoice: 0,
    },
    reducers: {
        addInvoice: (state, action) => {
            state.invoice.push(action.payload)
            state.totalInvoice += parseInt(action.payload.price)
        },
        removeInvoice: (state, action) => {
            state.totalInvoice -= parseInt(state.invoice[action.payload].price)
            state.invoice.splice(action.payload, 1)
        },
        emptyInvoice: (state) => {
            state.invoice = []
            state.totalInvoice = 0
        }
    }
})

export const { addInvoice, removeInvoice, emptyInvoice } = invoices.actions

export default invoices.reducer