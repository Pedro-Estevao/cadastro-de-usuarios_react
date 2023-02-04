import React, { useRef } from "react";

function Form({ onEdit }) {
    const ref = useRef();

    return (
        <div className="cdu-card card" ref={ref}>
            <div className="cdu-card--body card-body">
                <form name="cdu-form" className="cdu-form" action="#" method="POST">
                    <div className="cdu-form--group name">
                        <label>Nome</label>
                        <input type="text" name="cdu-name" className="cdu-input" />
                    </div>
                    <div className="cdu-form--group email">
                        <label>E-mail</label>
                        <input type="text" name="cdu-email" className="cdu-input" />
                    </div>
                    <div className="cdu-form--group phone">
                        <label>Telefone</label>
                        <input type="text" name="cdu-phone" className="cdu-input" />
                    </div>
                    <div className="cdu-form--group date">
                        <label>Data de Nascimento</label>
                        <input type="date" name="cdu-date" className="cdu-input" />
                    </div>
                    <div className="cdu-form--group submit">
                        <button type="submit" name="cdu-submit" className="cdu-submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;