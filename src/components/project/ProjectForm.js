import { useEffect, useState } from 'react';

import Input from '../form/InputForm.js';
import SelectForm from '../form/SelectForm.js';
import SubmitForm from '../form/SubmitForm.js';
import styles from './ProjectForm.module.css'

function ProjectForm( {btnText} ) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    },[])

    return (
        <form className={styles.form}>
            <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto" />
            <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o Orçamento total" />
            <SelectForm name="category_id" text="Selecione a categoria" options={categories} />
            <SubmitForm text={btnText} />
        </form>
    )
}

export default ProjectForm;