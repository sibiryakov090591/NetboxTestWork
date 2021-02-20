import React, {ChangeEvent, useState} from 'react';
import styles from './EditableElement.module.css';
import {deleteItemAPI, ItemType, updateItemAPI} from "../reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    tableItem: ItemType
}

export const EditableElement: React.FC<PropsType> = ((props) => {

    const [id, name, age, phone, email] = props.tableItem.map(i => i.value)

    const [editMode, setEditMode] = useState<boolean>(false)
    const [nameTitle, setNameTitle] = useState<string>(String(name))
    const [ageTitle, setAgeTitle] = useState<number>(Number(age))
    const [phoneTitle, setPhoneTitle] = useState<string>(String(phone))
    const [emailTitle, setEmailTitle] = useState<string>(String(email))
    const dispatch = useDispatch()

    // callbacks
    const deleteItemHandler = () => dispatch(deleteItemAPI(Number(id)))
    const activateEditModeHandler = () => setEditMode(true)
    const saveItemHandler = () => {
        setEditMode(false)

        dispatch(updateItemAPI(+id, nameTitle, ageTitle, phoneTitle, emailTitle))
    }

    // Setters input values
    const onChangeNameTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNameTitle(e.currentTarget.value)
    }
    const onChangeAgeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setAgeTitle(Number(value))
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
            <td>{id}</td>
            <td>{editMode ? <input className={styles.input}
                                   type="text" value={nameTitle}
                                   onChange={onChangeNameTitleHandler}/> : name}
            </td>
            <td>{editMode ? <input className={styles.input}
                                   type="text" value={ageTitle}
                                   onChange={onChangeAgeTitleHandler}/> : age}
            </td>
            <td>{editMode ? <input className={styles.input}
                                   type="text" value={phoneTitle}
                                   onChange={onChangePhoneTitleHandler}/> : phone}
            </td>
            <td>{editMode ? <input className={styles.input}
                                   type="text" value={emailTitle}
                                   onChange={onChangeEmailTitleHandler}/> : email}
            </td>
            <td>
                {
                    editMode
                        ? <button className={styles.btn} onClick={saveItemHandler}>Save</button>
                        : <button className={styles.btn} onClick={activateEditModeHandler}>Change</button>
                }
            </td>
            <td>
                <button className={styles.btn} onClick={deleteItemHandler}>Delete</button>
            </td>
        </tr>
    )
})