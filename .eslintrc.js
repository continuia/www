export default [
    {
        files: ["**/*.{js,ts,jsx,tsx}"],
        rules: {
            "no-unused-vars": "warn", // Or "error" for strict
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
];
