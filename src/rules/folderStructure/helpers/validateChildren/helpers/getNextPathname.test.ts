import { getNextPathname } from "./getNextPathname";

describe("getNextPathname", () => {
    it("should return correct next path", () => {
        expect(
            getNextPathname("src/features/ComponentName.tsx", "src/features"),
        ).toEqual("ComponentName.tsx");
    });
});
