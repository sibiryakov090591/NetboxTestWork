import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./Task2.module.css";
import {DataGrid, ColDef} from '@material-ui/data-grid';
import {useDispatch, useSelector} from "react-redux";
import {addItemAPI, initializeAPI, reducerActions} from "./reducer";
import {GlobalStateType} from "./store";
import {EditableElement} from "./EditebleElement/EditableElement";

const Task2: React.FC = () => {

    const dispatch = useDispatch()
    const tableData = useSelector((state: GlobalStateType) => state.reducer)

    const [nameTitle, setNameTitle] = useState<string>("")
    const [ageTitle, setAgeTitle] = useState<number>(0)
    const [phoneTitle, setPhoneTitle] = useState<string>("")
    const [emailTitle, setEmailTitle] = useState<string>("")

    useEffect(() => {
        dispatch(initializeAPI())
    }, [])

    // For Material ui table
    // const columns: ColDef[] = [
    //     {field: 'id', headerName: 'ID', width: 70},
    //     {field: 'name', headerName: 'Name', width: 300},
    //     {field: 'age', headerName: 'Age', type: 'number', width: 90},
    //     {field: 'phone', headerName: 'Phone', width: 180},
    //     {field: 'email', headerName: 'E-Mail', width: 300},
    // ];
    //
    // const rows = tableData.map(item => {
    //
    //     const id = item.find(j => j.field === "ID")
    //     const name = item.find(j => j.field === "Name")
    //     const age = item.find(j => j.field === "Age")
    //     const phone = item.find(j => j.field === "Phone")
    //     const email = item.find(j => j.field === "E-mail")
    //
    //     if (id && name && age && phone && email) {
    //         return {
    //             id: id.value,
    //             name: name.value,
    //             age: age.value,
    //             phone: phone.value,
    //             email: email.value
    //         }
    //     } else return {}
    // })

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

    const addItemHandler = () => {
        dispatch(addItemAPI(nameTitle, ageTitle, phoneTitle, emailTitle))
        setNameTitle("")
        setAgeTitle(0)
        setPhoneTitle("")
        setEmailTitle("")
    }

    // When initialization data success
    if (tableData.length > 0) {

        const mapTableHeaders = tableData[0].map(i => <th key={i.value}>{i.field}</th>)
        const mapTableRows = tableData.map(item => <EditableElement key={item[0].value} tableItem={item}/>)

        return (
            <section className={styles.table}>
                <div className={styles.container}>

                    {/*  Table from Material ui with good sorts methods, but without delete and add functions  */}
                    {/*  <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection/>  */}


                    {/*  Custom native table  */}
                    <table>
                        <tr>
                            {mapTableHeaders}
                        </tr>

                        {mapTableRows}

                        <tr>
                            <td></td>
                            <td>
                                <input value={nameTitle}
                                       onChange={onChangeNameTitleHandler}
                                       type="text"/>
                            </td>
                            <td>
                                <input value={ageTitle}
                                       onChange={onChangeAgeTitleHandler}
                                       type="number"/>
                            </td>
                            <td>
                                <input value={phoneTitle}
                                       onChange={onChangePhoneTitleHandler}
                                       type="text"/>
                            </td>
                            <td>
                                <input value={emailTitle}
                                       onChange={onChangeEmailTitleHandler}
                                       type="text"/>
                            </td>
                            <td>
                                <button className={styles.btn} onClick={addItemHandler}>Добавить</button>
                            </td>
                        </tr>
                    </table>

                    <div>
                        Колличество строк в таблице: {tableData.length}
                    </div>
                </div>
            </section>
        )
    } else return <h1>Загрузка...</h1>
}

export default Task2;