import { getNextPathname } from "./getNextPath";

describe("getNextPath", () => {
    it("should return correct next path", () => {
        expect(
            getNextPathname("src/features/ComponentName.tsx", "src/features"),
        ).toEqual("ComponentName.tsx");
    });
});
