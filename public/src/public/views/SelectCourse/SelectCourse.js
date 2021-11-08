import React from "react";
import CoursesController from "../../../kernel/controllers/models/CoursesController";
import useCourses from "./hooks/useCourses";

const SelectCourse = ({}) => {
    const isMounted = React.useRef(true);
    const [coursesState, coursesActions, coursesDispatch] = useCourses(isMounted.current);

    React.useEffect(() => {
        console.log('fsdf');
        return () => {
            console.log('fsdf2');
            isMounted.current = false;
        }
    }, [])

    return (
        <div>
            {console.log('fsdf3')}
            <strong>Seleccione un curso</strong>
            <br />
            <ul>
                {coursesState.courses.map((item, key) => (
                    <li key={key}>{item.nombre}</li>
                ))}
            </ul>
        </div>
    )
}

export default SelectCourse;