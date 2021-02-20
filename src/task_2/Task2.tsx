import React, {useEffect, useState} from "react";
import styles from "./Task2.module.css";
import {DataGrid, ColDef} from '@material-ui/data-grid';
import {useDispatch, useSelector} from "react-redux";
import {initializeAPI, reducerActions} from "./reducer";
import {GlobalStateType} from "./store";
import {EditableElement} from "./EditebleElement/EditableElement";

const Task2: React.FC = () => {

    const dispatch = useDispatch()
    const tableData = useSelector((state: GlobalStateType) => state.reducer)

    useEffect(() => {
        dispatch(initializeAPI())
    }, [])

    // For Material ui table
    const columns: ColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 300},
        {field: 'age', headerName: 'Age', type: 'number', width: 90},
        {field: 'phone', headerName: 'Phone', width: 180},
        {field: 'email', headerName: 'E-Mail', width: 300},
    ];

    const rows = tableData.map(item => {

        const id = item.find(j => j.field === "ID")
        const name = item.find(j => j.field === "Name")
        const age = item.find(j => j.field === "Age")
        const phone = item.find(j => j.field === "Phone")
        const email = item.find(j => j.field === "E-mail")

        if (id && name && age && phone && email) {
            return {
                id: id.value,
                name: name.value,
                age: age.value,
                phone: phone.value,
                email: email.value
            }
        } else return {}
    })

    // When initialization data success
    if (tableData.length > 0) {

        const mapTableHeaders = tableData[0].map(i => <th>{i.field}</th>)
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