module.exports = async (req, res) => {
	if (req.session && req.session.userInfo) {
		var id = req.session.userInfo._id;
		res.send(`var isLogin = true,userId="${id}"`)
	} else {
		res.send('var isLogin = false,userId =" ')
	}
};
