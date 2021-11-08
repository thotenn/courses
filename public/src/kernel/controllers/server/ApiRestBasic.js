import DateTools from "../tools/dates";
import {getFetchJsonDict} from "./ApiCommons";

const defaultConfig = {
    title: '',
    keyRef: '',
    order: '',
    orderBy: '',
    rowsDensity: true,
    selectableRows: false,
    stickyHeader: true,
    columnsConfig: [],
    api: {
        url: '',
        contentfk: '',
        getbypk: '',
        create: '',
        read: '',
        update: '',
        delete: '',
        columns: [],
        fks: [],
        process_fks: false,
        values_req: [],
    }
}

const defaultColumn = {
    title: '',
    field: '',
    showcol: true,
    required: true,
    editable: '',
    type: '', //number/text
    numeric: false,
    disabled: false,
    lookup: null
}

const apiDataRemFromTypes = ['create', 'read', 'update', 'delete'];
const apiKeysForLookup = ["fks"];

const formatColumns = (columns) => {
    const newCols = columns.map(column => ({
        ...defaultColumn,
        ...column
    }));
    for (let i=0; i<newCols.length; i++) {
        if (newCols[i].type === 'number') newCols[i].numeric = true;
    }
    return newCols;
};

const formatConfig = (initConfig) => {
    return {
        ...defaultConfig,
        ...initConfig,
        columnsConfig: formatColumns(initConfig?.columnsConfig),
        api: {
            ...defaultConfig.api,
            ...initConfig?.api
        }
    }
}

/**
 * Prepara los datos a ser enviados
 * @param dataSetInitial
 * @param columns
 * @param extra_api_data
 * @returns {{data}|*}
 */
const prepareApiSet = (dataSetInitial, columns, extra_api_data) => {
    for (const stype in extra_api_data) {
        if (
            extra_api_data.hasOwnProperty(stype)
            && !apiDataRemFromTypes.includes(stype)
            && !dataSetInitial.hasOwnProperty(stype)
        )
            dataSetInitial[stype] = extra_api_data[stype];
    }

    // Ahora procesaremos la data, si es que hay
    if (dataSetInitial.hasOwnProperty('data')) {
        // Obtenemos todos los nombres de cols que son tipo date y que si son editables
        const dateCols = [];
        for (const item of columns) {
            if (item.type === 'date') {
                let disabled = false;
                if (item.disabled) disabled = true;
                if (!disabled) {
                    dateCols.push(item.field);
                }
            }
        }
        for (const item of dateCols) {
            dataSetInitial["data"][item] = DateTools.toStringFromDateFormat(dataSetInitial["data"][item]);
        }
    }
    return dataSetInitial;
};

const getData = (url, csrfToken, userToken, api_data_set, isMounted) => {
    return new Promise((resolve, reject) => {
        getFetchJsonDict(
            url,
            csrfToken,
            userToken,
            api_data_set,
            'POST'
        ).then(response => {
            if (response.status > 299) reject({});
            return response.json()
        }).then(data => {
            if (isMounted) {
                resolve(data);
            } else reject(null);
        }).catch(error => {
            console.log('Error en ApiRestBasic.getData: ', error);
            reject(error);
        })
    })
};

const getColsByType = (columns, colType, justEditable = true) => {
    const res = [];
    let editable = true;
    for (const item of columns) {
        editable = true;
        if (justEditable) if (item.editable === 'never') editable = false;
        if (editable) if (item.type === colType) res.push(item.field);
    }
    return res;
};

/**
 * Aqui formateamos los datos obtenidos o reversamos los datos convertidos para el consumo en django
 * @param dataObtained {Array<Object>} Array que contiene las columnas con sus respectivos datos
 * @param columns {Array}
 * @returns {*}
 */
const prepareDataObtained = (dataObtained, columns) => {
    const colsTypeDate = getColsByType(columns, 'date', true);
    if (colsTypeDate.length === 0) return dataObtained;
    for (let i = 0; i < dataObtained.length; i++) {
        for (const col of colsTypeDate) {
            if (dataObtained[i].hasOwnProperty(col)) {
                dataObtained[i][col] = DateTools.toDateFromStringFormat(dataObtained[i][col]);
            }
        }
    }
    return dataObtained;
};

const getValuesGetJson = (dataFromApi, values_req) => {
    if (values_req.length > 0) {
        const res = {};
        for (const item of values_req) {
            if (dataFromApi.hasOwnProperty(item))
                res[item] = dataFromApi[item];
        }
        return res;
    }
    return {pk: dataFromApi.pk};
}

/**
 * Cuando se trata de las columnas fk osea tipo select, el value en si podria ser un numero pero el label
 * o lo que se desea mostrar al usuario sera dentro del mismo row o la misma data con el mismo nombre del campo
 * pero con un prefijo de guion bajo, es decir, si el field es idtipodoc que puede ser 1,2,3,etc entonces el label
 * estara contenida en la propiedad _idtipodoc: 'CIP'
 * @param columnsConfig {array}
 * @param data {JSON}
 * @param fieldsTypeFk {array}
 */
const updateDataWithFksCols = (columnsConfig, data, fieldsTypeFk) => {
    // Si no hay fks entonces se retorna entera la data
    if (fieldsTypeFk.length === 0) return data;
    const fieldsFkWithValues = {};
    for (const item of columnsConfig){
        if (fieldsTypeFk.includes(item.field)){
            fieldsFkWithValues['_' + item.field] = item['lookup'][data[item.field]]
        }
    }
    return {...data, ...fieldsFkWithValues};
}

/**
 * Agrega los lookups a la configuracion de las columnas
 * @param columnsConfig {Array<Object>}
 * @param dataLookup {Array<{field: {string}, data: {Object}}>}
 * @returns {*}
 */
const loadLookupData = (columnsConfig, dataLookup) => {
    for (const col of columnsConfig){
        for (const item of dataLookup) {
            if (item.field === col.field) {
                col.lookup = item.data;
            }
        }
    }
    return columnsConfig;
}

export default class ApiRestBasic {
    constructor(csrfToken, userToken, initialConfig) {
        this.csrfToken = csrfToken;
        this.userToken = userToken;
        this.config = formatConfig(initialConfig);
        this.columnsAreFullyConfigured = false;
    }

    /**
     * Retorna la configuracion, si esto se hace luego de un getAll retornara con los fks con sus respectivos valores solicitados
     * @returns {*&{selectableRows: boolean, rowsDensity: boolean, stickyHeader: boolean, orderBy: string, keyRef: string, api: (*&{read: string, columns: [], create: string, update: string, process_fks: boolean, values_req: [], delete: string, url: string, fks: []}), title: string, columnsConfig, order: string}}
     */
    getConfig() {
        return this.config;
    }

    getColumnsWithLookup(isMounted) {
        return new Promise((resolve, reject) => {
            if (this.columnsAreFullyConfigured) resolve(this.config.columnsConfig);
            const dataSetInitial = {
                type: this.config.api.contentfk,
                fks: this.config.api.fks,
            };
            const api_data_set = prepareApiSet(dataSetInitial, this.config.columnsConfig, this.config.api);
            getData(this.config.api.url, this.csrfToken, this.userToken, api_data_set, isMounted).then(dataGet => {
                this.config.columnsConfig = loadLookupData(this.config.columnsConfig, dataGet['content']);
                this.columnsAreFullyConfigured = true;
                resolve(this.config.columnsConfig);
            }).catch(err => {
                console.log('Error en ApiRestBasic.getColumnsWithLookup: ', err);
                reject(err);
            });
        })
    }

    /**
     * Obtiene todos los datos de un model con rest basic activado
     * @param isMounted {boolean}
     * @returns {Promise<Array<Object>, string>}
     */
    getAll(isMounted = true) {
        return new Promise((resolve, reject) => {
            const dataSetInitial = {
                type: this.config.api.read,
                columns: this.config.api.columns,
            };
            const api_data_set = prepareApiSet(dataSetInitial, this.config.columnsConfig, this.config.api);
            getData(this.config.api.url, this.csrfToken, this.userToken, api_data_set, isMounted).then(dataGet => {
                const finalData = prepareDataObtained(dataGet['content'], this.config.columnsConfig);
                if (Object.keys(this.config.api).some(r => apiKeysForLookup.includes(r))) {
                    if (!this.columnsAreFullyConfigured) {
                        this.config.columnsConfig = loadLookupData(this.config.columnsConfig, dataGet['content_fk']);
                    }
                }
                resolve(finalData);
            }).catch(err => {
                console.log('Error en ApiRestBasic.getAll: ', err);
                reject(err);
            });
        });
    }

    /**
     * Obtiene una fila por pk
     * @param pk {int | string}
     * @param isMounted {boolean}
     * @returns {Promise<unknown>}
     */
    getByPk(pk, isMounted=true) {
        return new Promise((resolve, reject) => {
            const dataSetInitial = {
                type: this.config.api.getbypk,
                pk: pk
            };
            const api_data_set = prepareApiSet(dataSetInitial, this.config.columnsConfig, this.config.api);
            getData(this.config.api.url, this.csrfToken, this.userToken, api_data_set, isMounted).then(dataGet => {
                resolve(dataGet['content']);
            }).catch(err => {
                console.log('Error en ApiRestBasic.getByPk: ', err);
                reject(err);
            });
        });
    }

    /**
     * Crea o actualiza un registro
     * @param dataSet {Object}
     * @param isCreate {boolean}
     * @param isMounted {boolean}
     * @returns {Promise<unknown>}
     */
    createOrUpdate(dataSet, isCreate, isMounted) {
        return new Promise((resolve, reject) => {
            const dataSetInitial = {
                type: (isCreate ? this.config.api.create: this.config.api.update),
                data: dataSet
            };
            const api_data_set = prepareApiSet(dataSetInitial, this.config.columnsConfig, this.config.api);
            getData(this.config.api.url, this.csrfToken, this.userToken, api_data_set, isMounted).then(dataGet => {
                const newRow = {
                    ...prepareDataObtained([dataSet], this.config.columnsConfig)[0],
                    ...prepareDataObtained([getValuesGetJson(dataGet, this.config.api.values_req)], this.config.columnsConfig)[0]
                }
                resolve(updateDataWithFksCols(this.config.columnsConfig, newRow, this.config.api.fks));
            }).catch(err => {
                console.log('Error en ApiRestBasic.createOrUpdate: ', err);
                reject(err);
            });
        });
    }

    /**
     * Elimina 1 o mas registros
     * @param pksToDelete {Array<number>} pks to delete
     * @param isMounted {boolean}
     * @returns {Promise<unknown>}
     */
    deleteManyRows(pksToDelete, isMounted) {
        return new Promise((resolve, reject) => {
            const api_data_set = {
                type: this.config.api.delete,
                data: pksToDelete
            };
            getData(this.config.api.url, this.csrfToken, this.userToken, api_data_set, isMounted).then(dataGet => {
                resolve(dataGet);
            }).catch(err => {
                console.log('Error en ApiRestBasic.deleteManyRows: ', err);
                reject(err);
            });
        });
    }
}