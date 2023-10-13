import subprocess

if __name__ == "__main__":
    # Define the commands you want to run
    web_server_command = "cd server && gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:8000"
    frontend_command = "cd client && npm run start:prod"

    # Run the commands simultaneously using subprocess
    web_server_process = subprocess.Popen(web_server_command, shell=True)
    frontend_process = subprocess.Popen(frontend_command, shell=True)

    # Wait for both processes to finish
    web_server_process.wait()
    frontend_process.wait()
