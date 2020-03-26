
// ref: https://umijs.org/config/
export default {
	history: 'hash',
	publicPath: '/diyShields/',
	treeShaking: true,
	plugins: [
		// ref: https://umijs.org/plugin/umi-plugin-react.html
		['umi-plugin-react', {
			antd: true,
			dva: false,
			dynamicImport: false,
			title: 'diyShields',
			dll: false,

			routes: {
				exclude: [
					/components\//,
				],
			},
		}],
	],
}
