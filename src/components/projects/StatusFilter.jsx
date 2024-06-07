import { useEffect, useState, useRef } from "react";
import filter from '../../resources/icons/filter.svg';
import './StatusFilter.scss'

const StatusFilter = (props) => {
    const [isFilterWindowVisible, showFilterWindow] = useState(false);
    const [statusName, setStatus] = useState('');
    const [statusesComponents, setComponents] = useState();

    const menuRef = useRef();
    useEffect(() => {
        let handler = (event) => {
            if (!menuRef.current.contains(event.target)) {
                showFilterWindow(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });

    const statuses = [
        { name: 'Переговоры', emoji: '💭', color: '#000000', id: "62f0d315ed8a0bc438b4b600" },
        { name: 'Отрисовка дизайна', emoji: '🎨', color: '#000000', id: "6307603a9242b63c06acaa32" },
        { name: 'Утверждение дизайна', emoji: '📒', color: '#000000', id: "62f0d3aded8a0bc438b4b613" },
        { name: 'Старт программирования', emoji: '👨‍💻', color: '#000000', id: "62f0d3d8ed8a0bc438b4b614" },
        { name: 'Горит', emoji: '🔥', color: '#f44336', id: "62f0d403ed8a0bc438b4b615" },
        { name: 'Ждем ОС клиента', emoji: '⏳', color: '#000000', id: "62f0d410ed8a0bc438b4b616" },
        { name: 'Пишем инструкцию', emoji: '📃', color: '#000000', id: "62f0d42bed8a0bc438b4b617" },
        { name: 'Внутреннее тестирование', emoji: '⌨️', color: '#000000', id: "62f0d453ed8a0bc438b4b618" },
        { name: 'Вносим правки', emoji: '✍️', color: '#000000', id: "62f0d469ed8a0bc438b4b619" },
        { name: 'Реклама', emoji: '🔈', color: '#000000', id: "62f0d47fed8a0bc438b4b61a" },
        { name: 'Техподдержка', emoji: '🖥', color: '#000000', id: "62f0d493ed8a0bc438b4b61b" },
        { name: 'Закрыт', emoji: '✅', color: '#49bd16', id: "62f0d4a8ed8a0bc438b4b61c" },
        { name: 'Отдать в разработку', emoji: '📤', color: '#000000', id: "62f0d4b6ed8a0bc438b4b61d" },
        { name: 'Предложить в доп. продажу', emoji: '💵', color: '#000000', id: "62f0d4c5ed8a0bc438b4b61e" },
        { name: 'Ждем оплату', emoji: '💰', color: '#49bd16', id: "62f0d4d8ed8a0bc438b4b61f" },
        { name: 'Обсудить проект', emoji: '🗣', color: '#000000', id: "62f0d4fced8a0bc438b4b621" },
        { name: 'Приостановлен', emoji: '⛔️', color: '#f44336', id: "62f0d50ced8a0bc438b4b622" }]

    const getData = async () => {

        let newData = statuses.map(status => {
            return (
                <div className="Status" key={status.id} status={status.name} id={status.id} onClick={(e) => {
                    setStatus(e.currentTarget.getAttribute('status'));
                    props.setFilter(e.currentTarget.getAttribute('id'));
                }}>
                    <span>{status.name + ' '}</span>
                    <span>{status.emoji}</span>
                </div>
            )
        });
        setComponents(newData);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='FilterButton' ref={menuRef} onClick={() => { showFilterWindow(!isFilterWindowVisible) }}>
            {statusName !== '' ?
                <p>{statusName}</p> :
                <p>Статус</p>}
            <img alt="" src={filter} />
            <div onBlur={() => { showFilterWindow(false) }} className={isFilterWindowVisible ? "statusesList-visible" : "statusesList-hidden"}>
                <div className="Status" onClick={() => { props.setFilter('no-filter'); setStatus('') }}>
                    <p>No filter</p>
                </div>
                {statusesComponents}
            </div>
        </div>
    )
}

export default StatusFilter;