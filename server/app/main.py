from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from .router import records, query, pdf, auth
from .database import engine
from . import models
from typing import Annotated
import uuid
import os
from .config import server_dir

IMAGEDIR = "static/images/"


templates = Jinja2Templates(directory="templates")

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/api/static", StaticFiles(directory="static"), name="static")

app.include_router(records.router)
app.include_router(query.router)
app.include_router(pdf.router)
app.include_router(auth.router)

server_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
