module.exports = function check(str, bracketsConfig) {
  const stack = [];
    const openBrackets = [];
    const closeBrackets = [];
    const specialBrackets = new Set();
    const matchingPairs = {};

    for (const [open, close] of bracketsConfig) {
        openBrackets.push(open);
        closeBrackets.push(close);
        matchingPairs[close] = open;

        if (open === close) {
            specialBrackets.add(open);
        }
    }

    for (const char of str) {
        if (openBrackets.includes(char)) {
            if (specialBrackets.has(char) && stack[stack.length - 1] === char) {
                stack.pop();
            } else {
                stack.push(char);
            }
        } else if (closeBrackets.includes(char)) {
            const lastOpen = stack.pop();
            if (lastOpen !== matchingPairs[char]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}
