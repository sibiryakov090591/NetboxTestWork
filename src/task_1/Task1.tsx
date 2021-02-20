import React from "react";
import styles from "./Task1.module.css";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const Task1: React.FC = () => {

    return (
        <section className={styles.container}>

            {/*  for linear gradient color border */}
            <div className={styles.widgetBorderWrap}>

                <div className={styles.widget}>
                    <div className={styles.widgetInner}>
                        <p className={styles.text}>
                            Базовые сценарии поведения пользователей освещают чрезвычайно интересные особенности картины
                            в
                            целом, однако конкретные выводы, разумеется, своевременно верифицированы. Также как
                            социально-экономическое развитие способствует повышению качества системы массового участия.
                        </p>
                        <p className={styles.text}>
                            Принимая во внимание показатели успешности, высококачественный прототип будущего проекта
                            в значительной степени обусловливает важность новых принципов формирования
                            материально-технической и
                            кадровой базы.
                        </p>
                        <p className={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cupiditate dolor dolore
                            expedita numquam quos voluptatem voluptates? A aperiam consequuntur cumque deleniti dicta
                            est expedita ipsum itaque natus nemo officiis pariatur perspiciatis quaerat recusandae,
                            reiciendis rem repellat sunt, veritatis? Mollitia!
                        </p>
                    </div>
                </div>
            </div>

            <KeyboardArrowDownIcon style={{ fontSize: 40 }} className={styles.scrollDown}/>

        </section>
    )
}

export default React.memo(Task1);