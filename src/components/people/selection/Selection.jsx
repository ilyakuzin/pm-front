import Select from 'react-select'
import './Selection.scss'

export default function Selection(props) {
    return (
        <Select 
            classNamePrefix={props.classNamePrefix}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            value={props.value}
            isSearchable={props.isSearchable}
            onChange={props.onChange}
            options={props.options}
        />
    )
}