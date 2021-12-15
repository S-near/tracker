
const defaultState = {
    position:[40.730610, -73.935242],
    hidden:false,
    error:false,
    data:null,
}

const SET_POSITION = 'SET_POSITION'
const SET_HIDDEN = 'SET_HIDDEN'
const SET_ERROR = 'SET_ERROR'
const SET_DATA = 'SET_DATA'



export const reducer = (state=defaultState, action) => {
    switch (action.type){
        case SET_POSITION:
            return {...state, position: action.payload}
        case SET_HIDDEN:
            return {...state, hidden:action.payload}
        case SET_ERROR:
            return {...state, error:action.payload}
        case SET_DATA:
            return {...state, data:action.payload}
        default:
            return state
    }
}


export const setPositionAction = (payload) => ({type:SET_POSITION, payload:payload})
export const setHiddenAction = (payload) => ({type:SET_HIDDEN, payload:payload})
export const setErrorAction = (payload) => ({type:SET_ERROR, payload:payload})
export const setDataAction = (payload) => ({type:SET_DATA, payload:payload})

