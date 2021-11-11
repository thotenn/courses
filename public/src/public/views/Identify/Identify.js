//https://tailwindcomponents.com/component/login-form-with-floating-labels
import React from 'react';
import PropTypes from 'prop-types';
import usePublic from "../../hooks/usePublic";
import CoursesController from "../../../kernel/controllers/models/CoursesController";
import useFormBasic from '../../../kernel/hooks/tools/useFormBasic';
import InscriptionsController from '../../../kernel/controllers/models/InscriptionsController';
import useAuth from '../../../kernel/auth/useAuth';
import LoaderSpinner from '../../../kernel/cmp/tools/LoaderSpinner';

const Identify = ({}) => {
    const isMounted = React.useRef(true);
    const {state: authState} = useAuth();
    const {
        state: publicState,
        coursesState
    } = usePublic();

    const [
        formValues,
        handleChangeInput,
        setValue
    ] = useFormBasic({
        identificador: ""
    });

    const [state, setState] = React.useState({
        loading: false
    })

    const isEnrolled = () => {
        setState({
            ...state,
            loading: true
        })
        InscriptionsController.isEnrolled(
            formValues.identificador, publicState.course.pk, isMounted.current, authState.csrfToken
        ).then(data => {
            console.log(data)
        }).catch(err => console.log(err));
    }

    React.useEffect(() => {
        return () => isMounted.current=false;
    }, [])

    return (
        <div className="min-h-screen flex flex-col justify-center py-12">
            <div className="relative py-3 max-w-xl mx-auto px-3">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-pink-200 to-indigo-600 shadow-lg transform -skew-y-6 rotate-6 rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">{CoursesController.getNameByPk(publicState.course.pk, coursesState.courses) || "Curso"}</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input 
                                        autoComplete="off" type="text"
                                        className="placeholder-transparent my-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                        placeholder="Número de Cédula"
                                        value={formValues.identificador || ""}
                                        onChange={e => handleChangeInput(e, "identificador")}
                                    />
                                    <label
                                       className="absolute left-0 -top-3.5 text-gray-600 text-sm"
                                    >
                                        Ingrese su número de cédula
                                    </label>
                                </div>
                                <div className="relative">
                                    <button
                                        className=" bg-blue-500 hover:bg-blue-700 text-white rounded-md px-5 py-3 w-full"
                                        onClick={isEnrolled}
                                    ><LoaderSpinner size='10'/>&nbsp;Procesar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Identify.propTypes = {};

export default Identify;
