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

const Identify = () => {
    const isMounted = React.useRef(true);
    const form_id = uuidv4();

    const { state: authState } = useAuth();
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
        loading: false,
        dataGet: {
            status: true,
            data: {
                apellido: "",
                nombre: ""
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
        InscriptionsController.isEnrolled(
            formValues.identificador, publicState.course.pk, isMounted.current, authState.csrfToken
        ).then(data => {
            console.log(data);
            if (!data.status) {
            }
            setState({ ...state, loading: false, dataGet: data });
        }).catch(err => {
            console.log(err);
            setState({ ...state, loading: false });
        });
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
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <form id={form_id} onSubmit={e => isEnrolled(e)}>
                                        <input
                                            id={form_id + "_ci"}
                                            autoComplete="off" type="text"
                                            className="placeholder-transparent my-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                            placeholder="Número de Cédula"
                                            value={formValues.identificador || ""}
                                            onChange={e => handleChangeInput(e, "identificador")}
                                        />
                                        <label
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm"
                                            for={form_id + "_ci"}
                                        >
                                            Ingrese su número de cédula
                                        </label>
                                    </form>
                                </div>
                                <div className="relative">
                                    <button
                                        className={
                                            "flex text-white rounded-md px-5 py-3 w-full " +
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
