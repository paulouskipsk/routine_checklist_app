export class Routes {

    public constructor() {}

    public static PATH = {
        LOGIN: '/auth/login',
        AUTH: '/auth/authenticate',
        GET_USER_DATA_BY_CREDENTIALS : '/auth/user-data-by-credentials',
        LOGOUT: '/auth/logout',

        GET_TASKS_BY_USER: '/checklistmov/by-user',
        GET_CHECKLIST_MOV: '/checklistmov/with-itens',

        GET_CHECKLIST_ITENS_MOVS: '/checklistitemmov/by-checklistmov',
        UPDATE_ITEM_CHECKLIST_MOV: '/checklistitemmov'
    }

}