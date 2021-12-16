import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
    name: 'report',
    initialState: {
        texts: [],
        graphs: [],
        tables: []
    },
    reducers: {
        addGraph: (state, graph) => {
            state.graphs.push(graph.payload)
        },
        addText: (state, text) => {
            state.texts.push(text.payload)
        },
        addTable: (state, table) => {
            state.tables.push(table.payload)
        },
        removeGraph: (state, graph) => {
            state.graphs.splice(state.graphs.indexOf(graph.payload), 1)
        },
        removeText: (state, graph) => {
            state.texts.splice(state.texts.indexOf(graph.payload), 1)
        },
        removeTable: (state, graph) => {
            state.tables.splice(state.tables.indexOf(graph.payload), 1)
        },
    },
})

export const { addGraph, addTable, addText, removeGraph, removeTablem, removeText } = reportSlice.actions

export default reportSlice.reducer