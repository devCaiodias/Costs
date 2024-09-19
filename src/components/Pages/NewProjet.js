import ProjectForm from '../project/ProjectForm';
import styles from './NewProjet.module.css'

function NewProjet() {
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Criar projeto para depois adicionar os serviços</p>
            <ProjectForm btnText="Criar Projeto"/>
       </div>
    )
}

export default NewProjet;