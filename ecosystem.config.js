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
      script: "popcorn_api/manage.py",
      args: "runserver 0.0.0.0:4001",
      cwd: './popcorn-time-api',
      interpreter: "./.venv/bin/python"
    }
  ],
};
