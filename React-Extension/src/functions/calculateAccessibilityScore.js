
export const calculateAccessibilityScore = (testsRan, passes, inapplicable) => {

    const score = (passes / (testsRan - inapplicable)) * 100;
    return score.toFixed(2);
};