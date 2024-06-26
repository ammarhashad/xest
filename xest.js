#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const { description, version } = require("./package.json");

const { generate, run, fresh, applyRecipe, diagram, ai, deploy } = require("./cli/commands/index");

program
  .command("start [appname]", { isDefault: true })
  .description("scaffold a new Xest API project")
  .action(generate(program));

program
  .command("run")
  .description("run your Xest project")
  .action(run);

program
  .command("fresh")
  .description(
    chalk.blueBright`a fresh run of your project with MySQL data cleared and re-initialized.`
  )
  .addHelpText(
    "after",
    chalk.yellow`
Starts your MySQL container instance, runs seed data and other migrations if necessary.\nIt will then spawn an Express API using nodemon for local development.`
  )
  .action(fresh);

program
  .command("new [recipe]")
  .description("Create new resources with Xest interactive wizard.")
  .action(applyRecipe);

program
  .command("diagram")
  .alias("dia")
  .description("View your database diagram in your web browser")
  .action(diagram);

  program
  .command("ai")
  .description("Use XestGPT to assist with general development tasks")
  .action(ai);

program
  .command("deploy")
  .description("Deploy your xest project")
  .action(deploy);

program
  .description(description)
  .version(version, "-v, --version")
  .parse(process.argv);
