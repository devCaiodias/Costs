import styles from './SelectForm.module.css'

function SelectForm( {text, name, options, handleOnChange, value}) {
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name}>
                <option>Seleciona uma opção </option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}> {option.name}</option>
                ))}
            </select>
            
        </div>
    )
}

export default SelectForm;