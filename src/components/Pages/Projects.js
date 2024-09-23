import { useLocation } from "react-router-dom";

import Mensagem from "../layout/Menssagem"; 

function Projects() {
    const location = useLocation();

    let mensagem = '';

    if (location.state) {
        mensagem = location.state.mensagem;
    }

    return (
        <div>
            <h1>Meus Projetos</h1>
            {mensagem && <Mensagem msg={mensagem} type="sucesso" />}
        </div>
    );
}

export default Projects;
