const _progress = require("cli-progress");
const terminalLink = require("terminal-link");
const Ora = require("ora");
const chalk = require("chalk");
var cowsay = require("cowsay");
const box = require("ascii-box").box;
const lolcatjs = require("lolcatjs");

const showProgress = (onComplete, flags) => {
  const name = flags.name ? flags.name : "あなた";
  console.log("\nloading 2021...");
  const b1 = new _progress.Bar({
    format: "[\u001b[36m{bar}\u001b[0m] {percentage}% | {value}/{total} days",
    hideCursor: true,
    barGlue: chalk.cyan(">"),
  });

  b1.start(365, 0, {});
  let value = 0;

  let timer = setInterval(function () {
    // increment value then updat
    value++;
    b1.update(value, {});
    if (value >= b1.getTotal()) {
      b1.stop();
      clearInterval(timer);

      const spinner = new Ora("2021 年は ...");
      spinner.start();
      setTimeout(() => {
        spinner.info("2021 年は 🐮 丑年 🐄！");
        spinner.start(`2021 年は${name}にとって ...`);
        setTimeout(() => {
          spinner.succeed(
            "2021 年はあなたにとって「素晴らしい一年」になるでしょう！👨‍💻"
          );
          // run complete callback
          onComplete.apply(this);
        }, 2000);
      }, 1000);
    }
  }, 15);
};

const showHappyNewYear2021 = async ({ random }) => {
  // many cows: https://github.com/piuccio/cowsay/tree/master/cows
  let cow = null;
  if (random) {
    const cowsList = await cowsay.list(() => {}).then((cows) => cows);
    cow = cowsList[Math.floor(Math.random() * cowsList.length)];
  }
  const message = cow ? `\nrandom cow: ${cow}` : "\n";
  setTimeout(() => {
    lolcatjs.fromString(
      box(
        cowsay.say({
          text: "\nHappy New Year 2021!\n",
          f: cow ? cow.slice(0, -4) : "default",
        }) +
          "\n\n\nfrom " +
          terminalLink("@takapiro99  ", "https://github.com/takapiro99")
      ) +
        message +
        "\n"
    );
  }, 1000);
};

module.exports = (input, flags) => {
  showProgress(() => showHappyNewYear2021(flags), flags);
};
