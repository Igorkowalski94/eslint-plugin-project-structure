import { getNextPathname } from "./getNextPath";

jest.mock("path", () => ({
    sep: "/",
}));

describe("getNextPath", () => {
    it("should return correct next path", () => {
        expect(
            getNextPathname("src/features/ComponentName.tsx", "src/features"),
        ).toEqual("ComponentName.tsx");
    });
});
