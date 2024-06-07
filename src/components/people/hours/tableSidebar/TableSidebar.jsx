
import './tableSidebar.scss'

export default function TableSidebar({projectHours, projects}) {
    
    function total () {
        let totalProjectsHours = 0
        projectHours.forEach(element => {
            totalProjectsHours += element
        });
        return totalProjectsHours
    }

    

    const sidebarContent = projects.map((item, id) => 
        (
            <div className='tableSidebar--row'>
                <p className='tableSidebar--row_name'>
                    {item.name}
                </p>
                <p className='tableSidebar--row_hours'>
                    {projectHours[id]}
                </p>
            </div>
        )
    )

    return (
        <div className='table-Sidebar'>
            <div className='tableSidebar--header'>
                <p className='tableSidebar--header_name'>
                    Название
                </p>
                <p className='tableSidebar--header_hours'>
                    Отмеченные часы
                </p>
            </div>
            {sidebarContent}
            <div className='tableSidebar--total'>
                <p className='tableSidebar--total_name'>
                    Всего
                </p>
                <p className='tableSidebar--total_hours'>
                    {total()}
                </p>
            </div>
        </div>
    )
}