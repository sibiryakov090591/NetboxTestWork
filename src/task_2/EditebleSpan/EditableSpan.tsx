import React, {ChangeEvent, useState} from 'react';
import styles from './EditableSpan.module.css';
import {ItemType, reducerActions} from "../reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    tableItem: ItemType
}

export const EditableSpan: React.FC<PropsType> = (props) => {

    const [id ,name, age, phone, email] = props.tableItem

    const [editMode, setEditMode] = useState(false)
    const [idTitle, setIdTitle] = useState(id.value)
    const [nameTitle, setNameTitle] = useState(name.value)
    const [ageTitle, setAgeTitle] = useState(age.value)
    const [phoneTitle, setPhoneTitle] = useState(phone.value)
    const [emailTitle, setEmailTitle] = useState(email.value)
    const dispatch = useDispatch()


    // callbacks
    const deleteItemHandler = () => dispatch(reducerActions.deleteItem(id.value))
    const changeItemHandler = () => setEditMode(true)
    const saveItemHandler = () => {
        setEditMode(false)
        const newItem: ItemType = [...props.tableItem.map(i => {
            switch (i.field) {
                case "ID": {
                    return {
                        ...i,
                        value: idTitle
                    }
                }
                case "Name": {
                    return {
                        ...i,
                        value: nameTitle
                    }
                }
                case "Age": {
                    return {
                        ...i,
                        value: ageTitle
                    }
                }
                case "Phone": {
                    return {
                        ...i,
                        value: phoneTitle
                    }
                }
                case "E-mail": {
                    return {
                        ...i,
                        value: emailTitle
                    }
                }
                default: return i
            }
        })]

        dispatch(reducerActions.saveItem(newItem))
    }

    // Setters input values
    const onChangeIdTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIdTitle(e.currentTarget.value)
    }
    const onChangeNameTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNameTitle(e.currentTarget.value)
    }
    const onChangeAgeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAgeTitle(e.currentTarget.value)
    }
    const onChangePhoneTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneTitle(e.currentTarget.value)
    }
    const onChangeEmailTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailTitle(e.currentTarget.value)
    }


    // render
    return (
        <tr>
            <td>{editMode ? <input className={styles.input}
                                   type="text" value={idTitle}
                                   onChange={onChangeIdTitleHandler}/> : id.value}
            </td>
            <td>{editMode ? <input className={styles.input}
                                   type="text" value={nameTitle}
                                   onChange={onChangeNameTitleHandler}/> : name.value}
            </td>
            <td>{editMode ? <input className={styles.input}
                                   type="text" value={ageTitle}
                                   onChange={onChangeAgeTitleHandler}/> : age.value}
            </td>
            <td>{editMode ? <input className={styles.input}
                                   type="text" value={phoneTitle}
                                   onChange={onChangePhoneTitleHandler}/> : phone.value}
            </td>
            <td>{editMode ? <input className={styles.input}
                                   type="text" value={emailTitle}
                                   onChange={onChangeEmailTitleHandler}/> : email.value}
            </td>
            <td>
            {
                editMode
                ? <button className={styles.btn} onClick={saveItemHandler}>Save</button>
                : <button className={styles.btn} onClick={changeItemHandler}>Change</button>
            }
            </td>
            <td>
                <button className={styles.btn} onClick={deleteItemHandler}>Delete</button>
            </td>
        </tr>
    )
}
