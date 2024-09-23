import { useLocation } from "react-router-dom";
import styles from './Projects.module.css';
import Mensagem from "../layout/Menssagem"; 
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";

function Projects() {
    const location = useLocation();

    let mensagem = '';

    if (location.state) {
        mensagem = location.state.mensagem;
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/NewProjet" text="Criar Projeto" />
            </div>
            {mensagem && <Mensagem msg={mensagem} type="sucesso" />}
            <Container customClass="start">
                <p>Projetos...</p>
            </Container>
        </div>
    );
}

export default Projects;
