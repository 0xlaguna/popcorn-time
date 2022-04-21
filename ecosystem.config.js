module.exports = {
  apps : [
    {
      name: 'popcorn-ui',
      script: 'yarn',
      args: "dev",
      cwd: './popcorn-time-ui',
      watch: '.'
    },
    {
      name: "popcorn-api",
      script: "./run.sh",
      cwd: './popcorn-time-api',
      env: {
        PORT: "4001"
      },
    }
  ],
};
