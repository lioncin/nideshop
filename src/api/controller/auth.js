const Base = require('./base.js');

module.exports = class extends Base {
	async loginByWeixinAction() {
		const code = this.post('code');
		const fullUserInfo = this.post('userInfo');
		const clientIp = this.ctx.ip;

		// 解释用户数据
		// const { errno, errmsg, data: userInfo } = await this.service('weixin', 'api').login(code, fullUserInfo);
		// if (errno !== 0) {
		// 	return this.fail(errno, errmsg);
		// }

		// 根据openid查找用户是否已经注册
		let userId = await this.model('user').where({ weixin_openid: fullUserInfo.openId }).getField('id', true);
		if (think.isEmpty(userId)) {
			// 注册
			userId = await this.model('user').add({
				username: '微信用户' + think.uuid(6),
				password: '',
				register_time: parseInt(new Date().getTime() / 1000),
				register_ip: clientIp,
				mobile: '',
				weixin_openid: fullUserInfo.openId,
				avatar: fullUserInfo.avatarUrl || '',
				gender: fullUserInfo.gender || 1, // 性别 0：未知、1：男、2：女
				nickname: fullUserInfo.nickName
			});
		}

		// 查询用户信息
		const newUserInfo = await this.model('user').field(['id', 'username', 'nickname', 'gender', 'avatar', 'birthday']).where({ id: userId }).find();

		// 更新登录信息
		await this.model('user').where({ id: userId }).update({
			last_login_time: parseInt(new Date().getTime() / 1000),
			last_login_ip: clientIp
		});

		const TokenSerivce = this.service('token', 'api');
		const sessionKey = await TokenSerivce.create({ user_id: userId });

		if (think.isEmpty(sessionKey)) {
			return this.fail('生成 token 失败');
		}
		return this.success({ token: sessionKey, userInfo: newUserInfo });
	}

	async logoutAction() {
		return this.success();
	}
};
