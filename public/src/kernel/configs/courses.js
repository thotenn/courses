import env from "../env";

const coursesConfig = {
    title: 'Courses',
    modalForm: true,
    keyRef: 'pk',
    order: 'asc',
    orderBy: 'nombre',
    rowsDensity: true,
    selectableRows: true,
    // containerStyle: {maxHeight: 440},
    stickyHeader: true,
    columnsConfig: [
        {title: '#', field: 'pk', align: 'left', type: 'numeric', disabled: true, editable: 'never'},
        {title: 'Nombre', field: 'nombre', required: true},
        {title: 'Descripcion', field: 'descripcion', required: false},
        {title: 'Categoria', field: 'categoria', required: true},
        {title: 'Habilitado', field: 'habilitado', required: true, type: 'boolean', initialEditValue: true},
    ],
    api: {
        url: env.URLS.public.APIS.cursos,
        contentfk: 'courses_contentfk',
        getbypk: 'courses_getbypk',
        create: 'courses_create',
        read: 'courses_getall',
        update: 'courses_update',
        delete: 'courses_mdelete',
        columns: ['pk', 'nombre', 'descripcion', 'categoria', 'habilitado'],
        fks: [
            {col: 'pk', field: 'categoria', val: 'nombre'},
        ],
        process_fks: true,
        values_req: ['pk'],
    }
};

export default coursesConfig;