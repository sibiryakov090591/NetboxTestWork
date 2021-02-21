import React from 'react';
import "./App.css";
import Task1 from './task_1/Task1';
import Task2 from './task_2/Task2';
import {Provider} from "react-redux";
import {store} from "./task_2/store";

const App: React.FC = () => {
  return (
    <div className="app">

        <Task1/> {/*  Responding HTML Widget  */}

        <Provider store={store}>
            <Task2/> {/*  Table with API response  */}
        </Provider>

    </div>
  );
}

export default App;
