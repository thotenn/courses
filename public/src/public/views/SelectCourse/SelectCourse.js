import React from "react";
import usePublic from "../../hooks/usePublic";
import CourseCard from "./cmp/CourseCard";
import {useHistory} from "react-router-dom";
import env from "../../../kernel/env";

/**
 *
 * @param {Array<{pk: number, nombre: string, descripcion: string, categoria: string, habilitado: boolean}>} courses
 * @returns JSX.element
 */
const SelectCourse = ({routes}) => {
    const history = useHistory();
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
        history.push(env.URLS.public.identify);
    }
    const goView = () => {
        console.log('public state: ', publicState);
        history.push(env.URLS.public.identify);
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
                        <div
                            key={key}
                            className="flex flex-col md:flex-row mt-5 max-w-2xl"
                            style={{cursor: "pointer"}}
                            onClick={() => selectCourse(item.pk)}
                        >
                            <CourseCard
                                title={item.nombre}
                                description={item.descripcion}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectCourse;