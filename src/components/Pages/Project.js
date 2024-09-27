import { v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Menssagem from '../layout/Menssagem';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Project() {

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => { 
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
            })
            .catch(err => console.log(err))
        },500)
        },[id])
            
    function toggleProjectForm() {
            setShowProjectForm(!showProjectForm)
        }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project) {
        setMessage('')
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType('erro')
            return false
        }
        
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado com sucesso')
            setType('sucesso')
        }).catch(err => console.log(err))
    }

    function createService(project) {
        setMessage('')

        // last service
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // maximun value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento Ultrapassado, verifique o valor do serviço')
            setType('erro')
            project.services.pop()
            return
        }

        // Add service cost to project total cost
        project.cost = newCost 

        // update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(resp => resp.json())
        .then((data) => {
            setShowServiceForm(false)
        }).catch(err => console.log(err))
    }

    function removeService() {
        
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Menssagem type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Project: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}> 
                                {!showProjectForm ? 'Editar Projeto': 'Fechar'}
                            </button >
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span> {project.categories.name}
                                    </p>
                                    <p>
                                        <span>Total Orçamento: </span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: </span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project} />    
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm handleSubmit={createService} textBtn="Adicionar Serviço" projectData={project}/>
                                )
                                }
                            </div>
                        </div>
                        <h2>Serviço</h2>
                        <Container customClass="stat">
                            {services.length > 0 && 
                                services.map((services) => (
                                    <ServiceCard id={services.id} name={services.name} cost={services.cost} description={services.description} key={services.id} handleRemove={removeService} />
                                )) 
                                }
                            {services.length === 0 && <p>Não há serviços castrados</p>}
                        </Container>
                    </Container>
                </div>
            ): (
                <Loading />
            )}
        </>
    )
}

export default Project;