import pkg from "@octokit/core";
const { Octokit } = pkg;
import dotenv from "dotenv";

dotenv.config();

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: `${process.env.GITHUB_ACCESS_TOKEN}` });

export default octokit;
