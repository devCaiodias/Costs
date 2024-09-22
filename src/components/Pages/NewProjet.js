import ProjectForm from '../project/ProjectForm';
import styles from './NewProjet.module.css';
import { useNavigate } from "react-router-dom";

function NewProjet() {

    const history  = useNavigate()
    
    function createPost(project) {
        // initialize costs end services
        project.cost = 0
        project.services = []
        
        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            // Redirect
            history('/projects', {menssagem: 'Projeto Criado com Sucesso'})
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Criar projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
       </div>
    )
}

export default NewProjet;