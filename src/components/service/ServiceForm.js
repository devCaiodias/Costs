import { useState } from 'react';

import Input from '../form/InputForm';
import SubmitForm from '../form/SubmitForm';

import styles from '../project/ProjectForm.module.css'

function ServiceForm({ handleSubmit, textBtn, projectData}) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }
    
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Nome do Serviço" name="name" placeholder="Insira seu serviço" handleOnChange={handleChange} />
            <Input type="number" text="Custo do Serviço" name="cost" placeholder="Insira o valor total" handleOnChange={handleChange} />
            <Input type="text" text="Descrição do Serviço" name="description" placeholder="Descreva o serviço" handleOnChange={handleChange} />
            <SubmitForm text={textBtn} />
        </form>
    )
}

export default ServiceForm;