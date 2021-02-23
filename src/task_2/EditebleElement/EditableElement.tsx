import React, {ChangeEvent, useState} from 'react';
import styles from './EditableElement.module.css';
import {deleteItemAPI, ItemType, updateItemAPI} from "../reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    tableItem: ItemType
}

export const EditableElement: React.FC<PropsType> = React.memo(((props) => {

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

    // Setter inputs values
    const onChangeTitleHandler = (callback: any, eventTargetValueType: string) => {

        if (eventTargetValueType === "number") {
            return (e: ChangeEvent<HTMLInputElement>) => {
                callback(Number(e.currentTarget.value))
            }
        } else {
            return (e: ChangeEvent<HTMLInputElement>) => {
                callback(e.currentTarget.value)
            }
        }
    }

    // render
    return (
        <tr>
            <td>{id}</td>
            <td>{editMode ? <input className={styles.input}
                                   type="text"
                                   value={nameTitle}
                                   onChange={onChangeTitleHandler(setNameTitle, "string")}/> : name}
            </td>
            <td>{editMode ? <input className={styles.input}
                                   type="number"
                                   value={ageTitle}
                                   onChange={onChangeTitleHandler(setAgeTitle, "number")}/> : age}
            </td>
            <td>{editMode ? <input className={styles.input}
                                   type="text"
                                   value={phoneTitle}
                                   onChange={onChangeTitleHandler(setPhoneTitle, "string")}/> : phone}
            </td>
            <td>{editMode ? <input className={styles.input}
                                   type="text"
                                   value={emailTitle}
                                   onChange={onChangeTitleHandler(setEmailTitle, "string")}/> : email}
            </td>
            <td>
                {
                    editMode
                        ? <button className={styles.btn} onClick={saveItemHandler}>Сохранить</button>
                        : <button className={styles.btn} onClick={activateEditModeHandler}>Изменить</button>
                }
            </td>
            <td>
                <button className={styles.btn} onClick={deleteItemHandler}>Удалить</button>
            </td>
        </tr>
    )
}))