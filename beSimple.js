var $ = require('jquery');

var Be = function(client_id) {
	this.client_id = client_id;
	this.base_url = 'http://www.behance.net/v2/';
}

Be.prototype = {
	user: function(user, cb) {
		// if get both params, call /v2/users/user
		var suffix_url = 'users/';
		if (typeof user === 'string' && typeof cb ==='function') {
			suffix_url += user;
			this._get(suffix_url, {}, cb);
		}
	},
	userProjects: function(user, params, cb) {
		if (typeof user === 'string' && typeof params === 'object' && typeof cb ==='function') {
			var suffix_url = 'users/' + user + '/projects';
			this._get(suffix_url, params, cb);
		}
	},
	userAppreciations: function(user, params, cb) {
		if (typeof user === 'string' && typeof params === 'object' && typeof cb ==='function') {
			var suffix_url = 'users/' + user + '/appreciations';
			this._get(suffix_url, params, cb);
		}
	},
	userFollowers: function(user, params, cb) {
		if (typeof user === 'string' && typeof params === 'object' && typeof cb ==='function') {
			var suffix_url = 'users/' + user + '/followers';
			this._get(suffix_url, params, cb);
		}
	},
	userAllFollowers: function(user, cb) {
		if (typeof user === 'string' && typeof cb ==='function') {
			var suffix_url = 'users/' + user + '/followers';
			var combined_followers = [];
			var page = 1;
			var shouldContinue = true;
			
			while(shouldContinue) {
				this._get(suffix_url, {per_page: 20, page: page}, function(data) {
					combined_followers.push(data.followers);
					page += 1;

					if (data.length === 0 || data.length < 20) {
						shouldContinue = false;
					}
				});
			}
			

			cb();
		}
	}
	userStats: function(user, params, cb) {
		if (typeof user === 'string' && typeof params === 'object' && typeof cb ==='function') {
			var suffix_url = 'users/' + user + '/stats';

			this._get(suffix_url, params, cb);
		}
	}
	_get: function(suffix_url, params, cb) {
		params.client_id = this.client_id;
		var url = this.base_url + suffix_url + paramsBuilder(params);
		console.log(url);
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: cb
		});
	}
}



function paramsBuilder(params) {
	var str = '?';
	for (var key in params) {
		if (params.hasOwnProperty(key)) {
			str = str.concat(key).concat('=').concat(params[key]).concat('&');
		}
	}
	
	return str
}



module.exports = Be;