import { environment } from '../../environments/environment';

export const APIURL = {
	// check server connection
	CHECK_SERVER_CONNECTION: environment.apiUrl + '/server',

	// Admin authentication & authorization API URL's
	ADD_NEW_ADMIN_DATA: environment.apiUrl + '/add_new_admin_data',
	ADMIN_LOGIN: environment.apiUrl + '/get_admin_login',
	ADMIN_AND_SETTINGS_LOGOUT: environment.apiUrl + '/admin_and_settings_logout',
	VALIDATE_ADMIN_EMAIL: environment.apiUrl + '/get_validate_admin_email',
	UPDATE_ADMIN_PASSWORD: environment.apiUrl + '/update_admin_password',

	// Admin Forms
	SAVE_LOGIN_ENCRYPT_DATA: environment.apiUrl + '/save_login_encrypt_data',
	GET_LOGIN_ENCRYPT_DATA: environment.apiUrl + '/get_login_encrypt_data',
	UPDATE_LOGIN_ENCRYPT_DATA_STATUS: environment.apiUrl + '/update_login_encrypt_data_status',

	// Admin Employees
	SAVE_EMPLOYEE_DATA: environment.apiUrl + '/save_employee_data',
	GET_ALL_EMPLOYEES_DATA: environment.apiUrl + '/get_all_employees_data',
	GET_EMPLOYEE_DATA_BY_ID: environment.apiUrl + '/get_employee_data_by_id',
	UPDATE_EMPLOYEE_DATA_STATUS: environment.apiUrl + '/update_employee_data_status',
	GET_LOGIN_HISTORY_DATA: environment.apiUrl + '/get_login_history_data'
}