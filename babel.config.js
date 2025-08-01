module.exports = (api) => {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
	};
};
