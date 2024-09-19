import Input from '../form/InputForm.js';
import SelectForm from '../form/SelectForm.js';
import SubmitForm from '../form/SubmitForm.js';
import styles from './ProjectForm.module.css'

function ProjectForm( {btnText} ) {
    return (
        <form className={styles.form}>
            <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto" />
            <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o Orçamento total" />
            <SelectForm name="category_id" text="Selecione a categoria" />
            <SubmitForm text={btnText} />
        </form>
    )
}

export default ProjectForm;