/**
 * Take arguments as a string and parse them into a
 * JSON and return that
 *
 * @param {String} message
 */

const argParse = (message: string) => {
  const argsPrimal = message.split("--");
  const argsJSON = {};
  for (const arg of argsPrimal) {
    if (arg.split(" ") && arg.split(" ").length >= 2) {
      const [argKey, ...argValArr] = arg.split(" ");
      const argVal = argValArr.join(" ");
      // @ts-ignore
      argsJSON[argKey] = argVal.trim() as string;
    }
  }
  return argsJSON;
};

/**
 * 'tis but a test lone traveller
 */

if (require.main === module) {
  const args = argParse(
    "--superuser dolphin san --sudoers delfin san --muted baka"
  );
  console.log(args);
}

export { argParse };
