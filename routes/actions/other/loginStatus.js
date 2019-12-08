module.exports = async (req, res) => {
	if (req.session && req.session.userInfo) {
		var id = req.session.userInfo._id;
		var role = req.session.userInfo.role;
		res.send(`var isLogin = true,userId="${id}",userRole="${role}"`)
	} else {
		res.send('var isLogin = false,userId ="" ')
	}
};
