import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from './Projects.module.css';

import Mensagem from "../layout/Menssagem"; 
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

function Projects() {
    const [projects, setProjects] = useState([]) 
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessagem, setProjectMessagem ] = useState('')

    const location = useLocation();

    let mensagem = '';

    if (location.state) {
        mensagem = location.state.mensagem;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("https://json-test-three-rho.vercel.app/projects", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setProjects(data)
                    setRemoveLoading(true)
                }).catch(err => console.log(err))
        }, 500)
    }, [])

    function removeProject(id) {
        fetch(`https://json-test-three-rho.vercel.app/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((projects => projects.id !== id )))
            setProjectMessagem('Projeto removido com susseso')


        })
        .catch(err => console.log(err))
        
        
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/NewProjet" text="Criar Projeto" />
            </div>
            {mensagem && <Mensagem msg={mensagem} type="sucesso" />}
            {projectMessagem && <Mensagem msg={projectMessagem} type="sucesso" />}
            <Container customClass="start">
                {projects.length > 0 && projects.map((projects) => {
                    return (
                        <ProjectCard
                            id={projects.id}
                            name={projects.name}
                            budget={projects.budget}
                            category={projects.categories ? projects.categories.name : "Sem Categoria"}
                            key={projects.id}
                            handleRemove={removeProject} />
                            
                    );
                })}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Nao ha projetos cadastrado!</p>
                )}
            </Container>
        </div>
    );
}

export default Projects;
