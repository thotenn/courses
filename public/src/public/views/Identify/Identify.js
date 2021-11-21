//https://tailwindcomponents.com/component/login-form-with-floating-labels
import React from 'react';
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types';
import usePublic from "../../hooks/usePublic";
import CoursesController from "../../../kernel/controllers/models/CoursesController";
import useFormBasic from '../../../kernel/hooks/tools/useFormBasic';
import InscriptionsController from '../../../kernel/controllers/models/InscriptionsController';
import useAuth from '../../../kernel/auth/useAuth';
import LoaderSpinner from '../../../kernel/cmp/tools/LoaderSpinner';
import Alert from '../../../plugins/windreact/src/cmp/Alert';
import { InputText } from '../../../plugins/windreact/src/cmp/Form';
import {useHistory} from "react-router-dom";
import env from '../../../kernel/env';

const Identify = () => {
    const isMounted = React.useRef(true);
    const form_id = uuidv4();
    const history = useHistory();

    const { state: authState } = useAuth();
    const {
        state: publicState,
        coursesState
    } = usePublic();

    const [
        formValues,
        handleChangeInput,
        setValue,
        cleanForm,
        setValues
    ] = useFormBasic({
        identificador: "",
        nombre: "",
        apellido: "",
        contacto: ""
    });

    const [state, setState] = React.useState({
        loading: false,
        dataGet: {
            status: true,
            student_exist: false,
            data: {
                apellido: "",
                nombre: "",
                contacto: ""
            }
        }
    });

    /**
     * 
     * @param {Event} e 
     */
    const isEnrolled = (e) => {
        e.preventDefault();
        setState({ ...state, loading: true });
        if (state.dataGet.status) {
            InscriptionsController.isEnrolled(
                formValues.identificador, publicState.course.pk, isMounted.current, authState.csrfToken
            ).then(data => {
                console.log(data);
                if (data.status) {
                    history.push(env.URLS.public.profile);
                } else {
                    if (data.student_exist){
                        setValues(data.data);
                    }
                }
                setState({ ...state, loading: false, dataGet: data });
            }).catch(err => {
                console.log(err);
                setState({ ...state, loading: false });
            });
        } else {
            // Si es que previamente el status era falso, osea se registrara ahora
            InscriptionsController.createAccount(
                formValues, publicState.course.pk, isMounted.current, authState.csrfToken
            ).then(data => {
                console.log(data);
                if (data.status) {
                    // Si se registro si inconvenientes
                }
                setState({ ...state, loading: false, dataGet: data });
            }).catch(err => {
                console.log(err);
                setState({ ...state, loading: false });
            });
        }
    }

    React.useEffect(() => {
        return () => isMounted.current = false;
    }, []);

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
                        {!state.dataGet.status &&
                            <div className="">
                                <Alert
                                    type="error"
                                    title="Usted no esta registrado."
                                    exit={false}
                                />
                            </div>}
                        <div className="divide-y divide-gray-200">
                            <div className="py-0 text-2xl leading-6 sm:leading-7 space-y-4 text-gray-700">
                                <div className="px-2 pb-1 text-lg shadow-md rounded-md text-left">
                                    <form id={form_id} onSubmit={e => isEnrolled(e)}>
                                        <InputText
                                            title="Número de Cédula"
                                            placeholder="Ingrese su número de cédula"
                                            value={formValues.identificador || ""}
                                            onChange={e => handleChangeInput(e, "identificador")}
                                        // svgPath="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"
                                        />
                                        {!state.dataGet.status &&
                                            <>
                                                <InputText
                                                    title="Nombre"
                                                    placeholder="Ingrese su nombre"
                                                    value={formValues.nombre || ""}
                                                    onChange={e => handleChangeInput(e, "nombre")}
                                                    type="text"
                                                />
                                                <InputText
                                                    title="Apellido"
                                                    placeholder="Ingrese su apellido"
                                                    value={formValues.apellido || ""}
                                                    onChange={e => handleChangeInput(e, "apellido")}
                                                />
                                                <InputText
                                                    title="Contacto"
                                                    placeholder="Ingrese su número de teléfono"
                                                    type="tel"
                                                    value={formValues.contacto || ""}
                                                    onChange={e => handleChangeInput(e, "contacto")}
                                                />
                                            </>}
                                    </form>
                                </div>
                                <div className="relative">
                                    <button
                                        className={
                                            "flex text-white rounded-md px-5 py-3 w-full shadow-md hover:shadow-xl ease-linear transition-all duration-150 " +
                                            (state.dataGet.status
                                                ? "bg-blue-500 hover:bg-blue-700"
                                                : "bg-green-500 hover:bg-green-700") +
                                            (state.loading ? " space-x-14" : " space-x-16")
                                        }
                                        type="submit"
                                        form={form_id}
                                    >
                                        <div className=""><LoaderSpinner active={state.loading} size='10' /></div>
                                        <div className="">{state.dataGet.status ? "Consultar" : "Registrarme"}</div>
                                    </button>
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
