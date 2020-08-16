import { Octokit } from "@octokit/rest";

const auth = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;

const octokit = new Octokit({
  auth,
});

export default octokit;
