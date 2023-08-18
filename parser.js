exports.parseForESLint = function (code, options) {
    return {
        ast: {
            type: "Program",
            start: 0,
            end: 0,
            loc: {
                start: {
                    line: 0,
                    column: 0,
                },
                end: {
                    line: 0,
                    column: 0,
                },
            },
            tokens: [],
            comments: [],
            range: [0, 0],
            sourceType: "module",
            body: [],
        },
        scopeManager: null,
        visitorKeys: null,
    };
};
