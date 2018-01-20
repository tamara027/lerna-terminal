'use strict';
const resolve = require('../resolve');
const { state, uiState } = require('../store');

const isValidStopFunction = (_state, packageName) => {
	return (
		_state[packageName] && _state[packageName].terminal && typeof _state[packageName].terminal.stop === 'function'
	);
};

/**
 * @param {string} packageName - the package name
 * @param {Function} render - the callback which should be a render function
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function cmdStop(packageName, render, { _state, _uiState }) {
	// if stop <packageName> try to stop script
	if (packageName) {
		if (isValidStopFunction(_state, packageName)) {
			_state[packageName].terminal.stop();
			render();
		}
		return;
	}

	// if focused run stop just for focused package
	if (_uiState.focus && _uiState.focus !== 'all' && _uiState.focus !== '') {
		if (isValidStopFunction(_state, _uiState.focus)) {
			_state[_uiState.focus].terminal.stop();
			render();
		}
		return;
	}

	// if split screen view stop all scripts
	Object.keys(_state).forEach(key => {
		if (isValidStopFunction(_state, key)) {
			_state[key].terminal.stop();
		}
	});
	render();
}

module.exports = resolve(cmdStop, { state, uiState });
module.exports.cmdStop = cmdStop;
