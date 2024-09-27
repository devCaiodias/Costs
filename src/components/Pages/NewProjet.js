import ProjectForm from '../project/ProjectForm';
import styles from './NewProjet.module.css';
import { useNavigate } from 'react-router-dom';

function NewProjet() {
    const navigate = useNavigate();

    function createPost(project) {
        // Initialize costs and services
        project.cost = 0;
        project.services = [];

        fetch('https://json-test-three-rho.vercel.app/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                // Redirect
                navigate('/projects', { state: { mensagem: 'Projeto Criado com Sucesso' } });
            })
            .catch((err) => console.log('Fetch error:', err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Criar projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    );
}

export default NewProjet;
