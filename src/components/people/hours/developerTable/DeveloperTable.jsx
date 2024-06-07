import './developerTable.scss'
import { ru } from 'date-fns/locale'
import EditTimeContextMenu from '../editTime/EditTimeContextMenu'
import { format } from 'date-fns'
import TableSidebar from '../tableSidebar/TableSidebar'
import { useState, useEffect } from 'react'
import { useRef } from 'react'

export default function DeveloperTable({dates, hours, projects, onReload}) {
    console.log(projects)
    console.log(hours)
    
    // const ref = useRef()
    // useOnClickOutside(ref, () => setShowContextMenu(false));
    // function useOnClickOutside(ref, handler) {
    //     useEffect(
    //       () => {
    //         const listener = (event) => {
    //           // Do nothing if clicking ref's element or descendent elements
    //           if (!ref.current) {
    //             return;
    //           }
    //           handler(event);
    //         };
    //         document.addEventListener("mousedown", listener);
    //         document.addEventListener("touchstart", listener);
    //         return () => {
    //           document.removeEventListener("mousedown", listener);
    //           document.removeEventListener("touchstart", listener);
    //         };
    //       },
    //       // Add ref and handler to effect dependencies
    //       // It's worth noting that because passed in handler is a new ...
    //       // ... function on every render that will cause this effect ...
    //       // ... callback/cleanup to run every render. It's not a big deal ...
    //       // ... but to optimize you can wrap handler in useCallback before ...
    //       // ... passing it into this hook.
    //       [ref, handler]
    //     );
    //   }

    let footerData = ( Array.from(Array(dates.length), () => 0))
    let totals =  ( Array.from(Array(projects.length), () => 0))

    const [showContextMenu, setShowContextMenu] = useState(false)
    const [param1, setParam1] = useState(0)
    const [param2, setParam2] = useState(0)

    const onCloseContext = () => {
        setShowContextMenu(false)
    }

    const header = dates.map((elem) => (
        <div style={{width: `calc(100% / ${dates.length})`, minWidth: "130px", backgroundColor: `${(format(elem, 'EE', {locale: ru})==='суб')||(format(elem, 'EE', {locale: ru})==='вск') ? '#f5f6fd' : '#fff'}`}}>
            <h1>{format(elem, 'dd', {locale: ru})}</h1>
            <p>{format(elem, 'EE', {locale: ru})}</p>
        </div>
    ))

    const helpingFunction = (anArray, project, projectId) => {

        for (let i = 0; i < dates.length; i++) {

            let j=0;
            let removeFromFooter = 0;

            const dateInLoop = format(dates[i], 'yyyy-MM-dd', {locale: ru});

            let item = 
                (<div 
                    id={`${projectId}-${i}`} 
                    className="table--body_item_null"
                    style={{width: `calc(100% / ${dates.length})`, minWidth: "130px", backgroundColor: `${(format(dates[i], 'EE', {locale: ru})==='суб')||(format(dates[i], 'EE', {locale: ru})==='вск') ? '#f5f6fd' : '#fff'}`}}
                    onClick={() => {setShowContextMenu(true); setParam1(projectId); setParam2(i)}}
                >
                    <p>0</p>
                </div>)

            
            
            if (hours) hours.forEach(data123 => {
                const dateInData = data123.date.toString().substring(0, 10)
                if (data123.projectId && dateInLoop === dateInData && data123.projectId.name === project.name) {
                    j++;
                    item =
                        <div 
                            id={`${projectId}-${i}`} 
                            className={(showContextMenu && param1===projectId && param2===i) ? 'table--body_item_hidden' : "table--body_item"} 
                            style={{width: `calc(100% / ${dates.length})`, minWidth: "130px", backgroundColor: `${(format(dates[i], 'EE', {locale: ru})==='суб')||(format(dates[i], 'EE', {locale: ru})==='вск') ? '#f5f6fd' : '#fff'}`}}
                            onClick={() => {setShowContextMenu(true); setParam1(projectId); setParam2(i)}}
                        >
                            <p>{data123.quantity}</p>

                            <div >

                            {(showContextMenu && param1===projectId && param2===i && data123.description) ? 

                            <EditTimeContextMenu
                                projectName={project.name}
                                hoursId={data123._id} 
                                date={dateInLoop}
                                hours={data123.quantity}
                                onReload={onReload}
                                onClose={onCloseContext}
                                description={data123.description}
                            /> 
                            
                            : ((showContextMenu && param1===projectId && param2===i && !data123.description) ? 
                            
                            <EditTimeContextMenu 
                                projectName={project.name}
                                hoursId={data123._id} 
                                date={dateInLoop}
                                hours={data123.quantity}
                                onReload={onReload}
                                onClose={onCloseContext}
                                description={null}
                            />

                            : null)
                            }
                            </div>

                        </div>


                    if (j==1) {
                        footerData[i]+=data123.quantity;

                        totals[projectId]+=data123.quantity;

                        removeFromFooter=data123.quantity;
                    } else {
                        footerData[i]-=removeFromFooter;
                        totals[projectId]-=removeFromFooter;

                        footerData[i]+=data123.quantity;
                        totals[projectId]+=data123.quantity;
                        
                        removeFromFooter=data123.quantity
                    }

                }
            })

            anArray.push(item)
        }
        return anArray
    }


    const bodyData = [];

    if (projects) projects.forEach( (project, id) => 
        {
            
            bodyData.push (<div className="table--body_row">
                {
                    helpingFunction([], project, id)
                }
            </div>)
        }
        
    )

    const footer = footerData.map((elem) => 
        <div className='table--footer_item' style={{
            width: `calc(100% / ${dates.length})`, 
            paddingTop: "10px",
            minWidth: "130px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",   
            borderTop: "1px solid #A7A7A7",
            height: "40px",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#000000",
            }}
        >
            {elem}
        </div>
    )
    
    return (
        <div className='developer--table'>
            <TableSidebar
                projectHours={totals}
                projects={projects}
            />
            <div className='developer-table--content'>
                <div className='table--header'>
                    {header}
                </div>
                <div className='table--body'>
                    {bodyData}
                </div>
                <div className='table--footer'>
                    <div className='table--foter_row'>
                        {footer}
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}