/* eslint complexity: 0*/

'use strict';
const { state, uiState } = require('../store');

const isValidChildProcessExecute = (_state, packageName) => {
	return (
		_state[packageName] &&
		_state[packageName].terminal &&
		typeof _state[packageName].terminal.execute === 'function'
	);
};

const notifications = {
	invalidCmd: () => ({
		type: 'error',
		message: 'The entered command is invalid, please enter help for more informations.',
		delay: 2000,
	}),
	invalidChildProcessExecute: () => ({
		type: 'error',
		message: 'Child process not found, please enter help for more informations.',
		delay: 2000,
	}),
};

/**
 * @param {string} cmd - the entered command
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @returns {void}
 **/
function cmdNative(cmd, packageName, render) {
	if (typeof cmd !== 'string' || cmd === '') {
		uiState.notifications.push(notifications.invalidCmd());
		return;
	}

	cmd = cmd.trim();

	if (typeof packageName !== 'string' || packageName === '' || typeof render !== 'function') {
		return;
	}
	if (!isValidChildProcessExecute(state, packageName)) {
		uiState.notifications.push(notifications.invalidChildProcessExecute());
		return;
	}

	state[packageName].terminal.execute(cmd);
	render();
}

module.exports = cmdNative;
