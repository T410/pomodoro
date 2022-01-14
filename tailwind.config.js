module.exports = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			gridTemplateRows: {
				"auto-1": "auto 1fr",
				custom: "1fr 1fr 2fr",
			},
			fontSize: {
				xxs: ".5rem",
			},
			border: {
				1: "1px solid",
			},
		},
	},
	plugins: [],
};
