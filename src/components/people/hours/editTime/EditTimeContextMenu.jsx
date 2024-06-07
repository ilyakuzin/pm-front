import './editTimeContextMenu.scss'
import { useSelector } from "react-redux";
import deleteHours from '../../../../data/Users/deleteHours.ts'
import { selectAccessToken } from '../../../../store/thisUserReducer'
import ChangeHours from '../changeHours/ChangeHours';
import { useState } from 'react';

export default function EditTimeContextMenu({projectName, hoursId=0, date, hours, onReload, onClose, description}) {

    const token = useSelector(selectAccessToken)
    const [editorShown, setEditorShown] = useState(false)

    const deleteHour = async () => {
        if (hoursId) {
            const UserData = await deleteHours (
                hoursId, token
            )
        }
        onClose()
        onReload()
    }

    return (
        <div>
            <div className={hours ? 'hours-context_menu' : 'hours-context_menu oneElMenu'}>
                <div className='hours-context_menu-options'>
                    
                    <div onClick={() => {setEditorShown(true)}} className={hours ? 'options_element' : 'options_element h37'}>
                        <p>Редактировать время</p>
                    </div>
                    
                    {hours && <div onClick={() => {deleteHour(); onReload(); onClose()}} className='options_element'>
                        <p>Удалить</p>
                    </div>}
                </div>
            </div>
            { editorShown &&
            <ChangeHours 
                projectName={projectName}
                date={date}
                hours={hours}
                onReload={onReload}
                onClose={onClose}
                onCloseEditor={() => setEditorShown(false)}
                hoursId={hoursId}
                description={description}
            /> }
        </div>
    )
}