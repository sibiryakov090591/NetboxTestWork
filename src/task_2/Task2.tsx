import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./Task2.module.css";
import {DataGrid, ColDef, setPageActionCreator} from '@material-ui/data-grid';
import {useDispatch, useSelector} from "react-redux";
import {addItemAPI, initializeAPI} from "./reducer";
import {GlobalStateType} from "./store";
import {EditableElement} from "./EditebleElement/EditableElement";
import CircularProgress from "@material-ui/core/CircularProgress";

const Task2: React.FC = () => {

    const dispatch = useDispatch()
    const tableData = useSelector((state: GlobalStateType) => state.reducer)

    // local state for add item inputs
    const [nameTitle, setNameTitle] = useState<string>("")
    const [ageTitle, setAgeTitle] = useState<number>(0)
    const [phoneTitle, setPhoneTitle] = useState<string>("")
    const [emailTitle, setEmailTitle] = useState<string>("")

    useEffect(() => {
        dispatch(initializeAPI())
    }, [dispatch])


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


    // add item inputs handlers
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

    const addItemHandler = () => {
        dispatch(addItemAPI(nameTitle, ageTitle, phoneTitle, emailTitle))
        // clear inputs
        setNameTitle("")
        setAgeTitle(0)
        setPhoneTitle("")
        setEmailTitle("")
    }

    // Show preloader before initialization data success
    if (!tableData) return <div style={{height: "100vh", padding: "30% 50%"}}><CircularProgress /></div>

    // Default table values
    let mapTableHeaders: JSX.Element | JSX.Element[] = (
        <>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Email</th>
        </>
    )
    let mapTableRows = null

    if (tableData.length > 0) {
        mapTableHeaders = tableData[0].map(i => <th key={i.value}>{i.field}</th>)
        mapTableRows = tableData.map(item => <EditableElement key={item[0].value} tableItem={item}/>)
    }

    // mapTdInputs
    const mapTd = (inputType: string, inputValue: string | number, callback: any, event: string) => {
        return (
            <td>
                <input className={styles.input}
                                   type={inputType}
                                   value={inputValue}
                                   onChange={onChangeTitleHandler(callback, event)}
                />
            </td>
        )
    }


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

                        {mapTd("text", nameTitle, setNameTitle, "string")}
                        {mapTd("number", ageTitle, setAgeTitle, "number")}
                        {mapTd("text", phoneTitle, setPhoneTitle, "string")}
                        {mapTd("text", emailTitle, setEmailTitle, "string")}

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
}

export default React.memo(Task2);