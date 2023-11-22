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
	GET_LOGIN_HISTORY_DATA: environment.apiUrl + '/get_login_history_data',
}