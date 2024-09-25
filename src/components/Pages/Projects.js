import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './Projects.module.css';
import Mensagem from "../layout/Menssagem"; 
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";

function Projects() {
    const [projects, setProjects] = useState([]) 

    const location = useLocation();

    let mensagem = '';

    if (location.state) {
        mensagem = location.state.mensagem;
    }

    useEffect(() => {
        fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            
        }).then(resp => resp.json())
        .then(data => {
            console.log(data)
            setProjects(data)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/NewProjet" text="Criar Projeto" />
            </div>
            {mensagem && <Mensagem msg={mensagem} type="sucesso" />}
            <Container customClass="start">
                {projects.length > 0 && projects.map((projects) => {
                    return (
                        <ProjectCard
                            id={projects.id}
                            name={projects.name}
                            budget={projects.budget}
                            category={projects.categories ? projects.categories.name : "Sem Categoria"}
                            key={projects.id} />
                    );
                })}
            </Container>
        </div>
    );
}

export default Projects;
