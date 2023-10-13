from pydantic import BaseSettings
from starlette.templating import Jinja2Templates
import os


class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_password: str
    database_name: str
    database_username: str
    wkhtmltopdf_path: str

    access_token_expire_minutes: str
    secret_key: str
    algorithm: str

    wkhtmltopdf_path: str

    class Config:
        env_file = ".env"

settings = Settings()

server_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

templates = Jinja2Templates(directory="templates")