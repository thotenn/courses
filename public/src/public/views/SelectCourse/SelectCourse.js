import React from "react";
import usePublic from "../../hooks/usePublic";
import CourseCard from "./cmp/CourseCard";

/**
 * 
 * @param {Array<{pk: number, nombre: string, descripcion: string, categoria: string, habilitado: boolean}>} courses
 * @returns JSX.element
 */
const SelectCourse = () => {
    const {
        state: publicState,
        actions: publicActions,
        dispatch: publicDispatch,
        coursesState
    } = usePublic();
    const isMounted = React.useRef(true);

    const selectCourse = (pk) => {
        publicDispatch({
            type: publicActions.SELECT_COURSE,
            payload: pk
        });
        console.log(publicState.course.pk)
    }

    React.useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    return (
        <div className="flex flex-col h-screen">
            <div className="m-auto">
                <div className="flex mx-3 justify-center font-primarytitle text-gray-200 text-2xl sm:text-4xl">
                    Seleccione un curso
                </div>
                <div className="flex flex-col md:flex-row mt-5 max-w-2xl">
                    {coursesState.courses.map((item, key) => (
                        <CourseCard
                            key={key}
                            title={item.nombre}
                            description={item.descripcion}
                            cb={selectCourse}
                            value={item.pk}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectCourse;