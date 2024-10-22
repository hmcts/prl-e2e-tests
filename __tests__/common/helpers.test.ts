import { Helpers } from "../../e2e/common/helpers";

jest.mock("../../e2e/common/helpers", () => {
  const actualHelpers = jest.requireActual("../../e2e/common/helpers");
  return {
    ...actualHelpers,
    shortMonth: (index: number) => {
      const mockMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      if (index < 1 || index > 12) {
        throw new Error("Month index out of range");
      }
      return mockMonths[index - 1];
    },
  };
});

describe("Helpers", () => {
  beforeEach(() => {
    const fixedDate = new Date(2024, 7, 21);
    jest.spyOn(globalThis, "Date").mockImplementation(() => fixedDate as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("todayDate()", () => {
    it("should return the formatted date string", () => {
      const result = Helpers.todayDate();
      expect(result).toBe("21 Aug 2024");
    });
  });

  describe("dayAbbreviatedMonthYear()", () => {
    it("should return the formatted date string for valid inputs", () => {
      const result = Helpers.dayAbbreviatedMonthYear("21", "8", "2024");
      expect(result).toBe("21 Aug 2024");
    });

    it("should throw an error for invalid month (0)", () => {
      expect(() => {
        Helpers.dayAbbreviatedMonthYear("21", "0", "2024");
      }).toThrow("Invalid month value");
    });

    it("should throw an error for invalid month (13)", () => {
      expect(() => {
        Helpers.dayAbbreviatedMonthYear("21", "13", "2024");
      }).toThrow("Invalid month value");
    });

    it("should throw an error for non-numeric month", () => {
      expect(() => {
        Helpers.dayAbbreviatedMonthYear("21", "abc", "2024");
      }).toThrow("Invalid month value");
    });

    it("should throw an error for empty month", () => {
      expect(() => {
        Helpers.dayAbbreviatedMonthYear("21", "", "2024");
      }).toThrow("Invalid month value");
    });

    it("should handle single-digit days and months", () => {
      const result = Helpers.dayAbbreviatedMonthYear("1", "1", "2024");
      expect(result).toBe("1 Jan 2024");
    });

    it("should handle single-digit days with double-digit months", () => {
      const result = Helpers.dayAbbreviatedMonthYear("5", "10", "2024");
      expect(result).toBe("5 Oct 2024");
    });

    it("should handle large year values", () => {
      const result = Helpers.dayAbbreviatedMonthYear("15", "12", "9999");
      expect(result).toBe("15 Dec 9999");
    });
  });

  describe("generateCaseName", () => {
    it("should generate a string starting with 'Automated tester'", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.5);
      const result = Helpers.generateCaseName();
      expect(result.startsWith("Automated tester")).toBe(true);
    });

    it("should generate a string with a number between 1 and 100", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.75);
      const result = Helpers.generateCaseName();
      expect(result).toMatch(/^Automated tester\d{1,3}$/);
    });

    it("should generate unique names for subsequent calls", () => {
      jest
        .spyOn(Math, "random")
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.2)
        .mockReturnValueOnce(0.3);
      const result1 = Helpers.generateCaseName();
      const result2 = Helpers.generateCaseName();
      const result3 = Helpers.generateCaseName();
      expect(result1).not.toBe(result2);
      expect(result2).not.toBe(result3);
      expect(result3).not.toBe(result1);
    });
  });

  describe("capitalizeFirstPart", () => {
    it("should capitalize the first letter of a string", () => {
      const result = Helpers.capitalizeFirstPart("hello world");
      expect(result).toBe("Hello world");
    });

    it("should return an empty string if input is empty", () => {
      const result = Helpers.capitalizeFirstPart("");
      expect(result).toBe("");
    });

    it("should handle a single character string", () => {
      const result = Helpers.capitalizeFirstPart("a");
      expect(result).toBe("A");
    });

    it("should not alter the rest of the string", () => {
      const result = Helpers.capitalizeFirstPart("hELLO world");
      expect(result).toBe("HELLO world");
    });

    it("should handle strings with leading whitespace", () => {
      const result = Helpers.capitalizeFirstPart("  hello world");
      expect(result).toBe("  hello world");
    });

    it("should handle already capitalized strings", () => {
      const result = Helpers.capitalizeFirstPart("Hello world");
      expect(result).toBe("Hello world");
    });
  });

  describe("generateDOB", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    const testCases = [
      { currentDate: new Date(2024, 9, 22), under18: true, expected: ['22', '10', '2007'] }, // October 22, 2024
      { currentDate: new Date(2023, 0, 1), under18: false, expected: ['1', '1', '2001'] },   // January 1, 2023
      { currentDate: new Date(2022, 5, 15), under18: true, expected: ['15', '6', '2005'] }, // June 15, 2022
    ];

    testCases.forEach(({ currentDate, under18, expected }) => {
      it(`should generate dob correctly for ${under18 ? "under 18" : "over 21"} on ${currentDate.toLocaleDateString()}`, () => {
        jest.spyOn(global, 'Date').mockImplementation(() => currentDate);

        const [day, month, year] = Helpers.generateDOB(under18);

        expect(day).toBe(expected[0]);
        expect(month).toBe(expected[1]);
        expect(year).toBe(expected[2]);
      });
    });
  });
});
