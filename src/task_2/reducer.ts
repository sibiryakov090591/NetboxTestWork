import {ThunkAction} from "redux-thunk";
import axios from "axios";

// constants
const SET_DATA = "reducer/SET_DATA"
const DELETE_ITEM = "reducer/DELETE_ITEM"
const SAVE_ITEM = "reducer/SAVE_ITEM"

type ObjectItemType = { field: string, value: number | string, type: string }

export type ItemType = ObjectItemType[]

const initialState: ItemType[] = []

const reducer = (state: ItemType[] = initialState, action: ReducerActionsType): ItemType[] => {
    switch (action.type) {

        case SET_DATA: {
            return action.payload
        }

        case DELETE_ITEM: {
            return state.filter(item => {
                for (let i = 0; i < item.length; i++) {
                    if (item[i].field === "ID" && item[i].value === action.itemId) {
                        return false
                    } else return true
                }
            })
        }

        case SAVE_ITEM: {
            // shallow state copy
            const copy = [...state.map(item => {
                const stateObj = item.find(i => i.field === "ID")
                const actionObj = action.data.find(i => i.field === "ID")
                if (stateObj && actionObj && stateObj.value === actionObj.value) {
                    return action.data
                } else return item
            })]
            return copy
        }

        default:
            return state
    }
}

// actions
export const reducerActions = {
    getData: (data: ItemType[]) => ({type: SET_DATA, payload: data} as const),
    deleteItem: (id: number | string) => ({type: DELETE_ITEM, itemId: id} as const),
    saveItem: (data: ItemType) => ({type: SAVE_ITEM, data} as const)
}

// Actions Global Type for reducer:
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : any
export type ReducerActionsType = ReturnType<PropertiesType<typeof reducerActions>>


// Thunks type
type ThunkType = ThunkAction<Promise<void>, ItemType, unknown, ReducerActionsType>

export const initialize = (): ThunkType => async (dispatch) => {
    const response = await axios.get("https://frontend-test.netbox.ru/")
    if (response.status === 200) {
        dispatch(reducerActions.getData(response.data))
    } else throw response.statusText || " SOmeError"
}

export default reducer;