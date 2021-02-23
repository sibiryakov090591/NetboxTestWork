import {ThunkAction} from "redux-thunk";
import axios from "axios";

// Constants
const SET_DATA = "reducer/SET_DATA"
const DELETE_ITEM = "reducer/DELETE_ITEM"
const SAVE_ITEM = "reducer/SAVE_ITEM"
const ADD_ITEM = "reducer/ADD_ITEM"


type ObjectItemType = { field: string, value: number | string, type: string }
export type ItemType = ObjectItemType[]


const initialState: ItemType[] | null = null

export const reducer = (state: ItemType[] | null = initialState, action: ReducerActionsType): ItemType[] | null => {

    switch (action.type) {

        case SET_DATA: {
            return action.payload
        }

        case DELETE_ITEM: {
            if (state) {
                return state.filter(item => {
                    for (let i = 0; i < item.length; i++) {
                        if (item[i].field === "ID" && item[i].value === action.itemId) {
                            return false
                        } else return true
                    }
                })
            } else return state
        }

        case SAVE_ITEM: {
            if (state) {
                return [...state.map(item => {

                    for (let i = 0; i < item.length; i++) {
                        if (item[i].field === "ID" && item[i].value === action.id) {
                            const copy = [...item.map(i => ({...i}))]
                            copy.map(i => {
                                if (i.field === "Name") i.value = action.name
                                if (i.field === "Age") i.value = action.age
                                if (i.field === "Phone") i.value = action.phone
                                if (i.field === "E-mail") i.value = action.email
                            })
                            return copy
                        }
                    }
                    return item
                })]
            } else return state
        }

        case ADD_ITEM: {
            if (state) {
                const newItem = [
                    {field: "ID", value: state.length + 1, type: "integer"},
                    {field: "Name", value: action.name, type: "string"},
                    {field: "Age", value: action.age, type: "integer"},
                    {field: "Phone", value: action.phone, type: "string"},
                    {field: "E-mail", value: action.email, type: "string"}
                ]
                return [
                    ...state,
                    newItem
                ]
            } else return state
        }

        default:
            return null
    }
}

// Actions
export const reducerActions = {
    getData: (data: ItemType[]) => ({type: SET_DATA, payload: data} as const),
    deleteItem: (id: number) => ({type: DELETE_ITEM, itemId: id} as const),
    saveItem: (id: number,
               name: string,
               age: number,
               phone: string,
               email: string) => ({type: SAVE_ITEM, id, name, age, phone, email} as const),
    addItem: (name: string,
              age: number,
              phone: string,
              email: string) => ({type: ADD_ITEM, name, age, phone, email} as const)
}


// Actions Global Type for reducer:
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : any
export type ReducerActionsType = ReturnType<PropertiesType<typeof reducerActions>>


// Thunks type
type ThunkType = ThunkAction<Promise<void>, ItemType, unknown, ReducerActionsType>


// Thunks
export const initializeAPI = (): ThunkType => async (dispatch) => {
    const response = await axios.get("https://frontend-test.netbox.ru/")
    if (response.status === 200) {
        dispatch(reducerActions.getData(response.data))
    } else throw response.statusText || " SOmeError"
}

export const deleteItemAPI = (id: number): ThunkType => async (dispatch) => {
    const response = await axios.get(`https://frontend-test.netbox.ru?method=delete&id=${id}`)
    if (response.status === 200) {
        dispatch(reducerActions.deleteItem(id))
    } else throw response.statusText || " SOmeError"
}

export const updateItemAPI = (id: number,
                              name: string,
                              age: number,
                              phone: string,
                              email: string): ThunkType => async (dispatch) => {
    const response = await axios.get(`https://frontend-test.netbox.ru?method=update&id=${id}&name=${name}&age=${age}&phone=${phone}&email=${email}`)
    if (response.status === 200) {
        dispatch(reducerActions.saveItem(id, name, age, phone, email))
    } else throw response.statusText || " SOmeError"
}

export const addItemAPI = (name: string,
                           age: number,
                           phone: string,
                           email: string): ThunkType => async (dispatch) => {
    const response = await axios.get(`https://frontend-test.netbox.ru?method=add&name=${name}&age=${age}&phone=${phone}&email=${email}`)
    if (response.status === 200) {
        dispatch(reducerActions.addItem(name, age, phone, email))
    } else throw response.statusText || " SOmeError"
}

export default reducer;