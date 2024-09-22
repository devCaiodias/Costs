import { useEffect, useState } from 'react';

import Input from '../form/InputForm.js';
import SelectForm from '../form/SelectForm.js';
import SubmitForm from '../form/SubmitForm.js';
import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit,btnText, projectData} ) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

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

    const submit = (e) => {
        e.preventDefault()
        // console.log(project)
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject(
            {...project, [e.target.name]: e.target.value}   
        )
    }

    function handleCategory(e) {
        setProject(
            {...project, categories: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }}
        )
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto" handleOnChange={handleChange} value={project.name ? project.name: ''} />
            <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o Orçamento total" handleOnChange={handleChange} value={project.budget ? project.budget: ''} />
            <SelectForm 
            name="category_id" 
            text="Selecione a categoria" 
            options={categories}
            handleOnChange={handleCategory} 
            value={project.categories ?  project.categories.id: ''}/>
            <SubmitForm text={btnText} />
        </form>
    )
}

export default ProjectForm;