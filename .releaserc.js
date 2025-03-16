module.exports = {
  branch: "main",
  repositoryUrl: "https://github.com/Sahil1709/finance-manager.git",
  ci: false,
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md"
      }
    ],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    [
      "@semantic-release/github",
      {
        assets: [],
        githubToken: process.env.GH_PAT_TOKEN
      }
    ]
  ]
};
