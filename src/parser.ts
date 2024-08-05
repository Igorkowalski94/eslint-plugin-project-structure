interface ParserReturn {
    ast: {
        type: string;
        start: number;
        end: number;
        loc: {
            start: {
                line: number;
                column: number;
            };
            end: {
                line: number;
                column: number;
            };
        };
        tokens: never[];
        comments: never[];
        range: number[];
        sourceType: string;
        body: never[];
    };
    scopeManager: null;
    visitorKeys: null;
}

exports.parseForESLint = (): ParserReturn => ({
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
});
