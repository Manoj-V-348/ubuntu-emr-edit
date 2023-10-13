from fastapi import APIRouter, Depends, status, HTTPException, Response, Form, UploadFile, File
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..encryption import encrypt, decrypt
import uuid
from .. import database, schemas, models, utils, oauth2
from ..database import get_db

router = APIRouter(prefix="/api/auth", tags=['Authentication'])


@router.post('/login', response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):

    users = db.query(models.User).all()
    required_user = None
    username = None

    for user in users:
        email = user.email
        decrypted_email = decrypt(email.encode())

        print(decrypted_email)

        if user_credentials.username == decrypted_email:
            required_user = user
            temp = user.username
            username = decrypt(temp.encode())
            break
    
  
    if not required_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
        

    if not utils.verify(user_credentials.password, required_user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    access_token = oauth2.create_access_token(data={"user_id": required_user.id})

    return {"token": access_token, "user": username}

@router.post("/register")
async def register(username: str = Form(...),
    email: str = Form(...),
    role: str = Form(...),
    phone: str = Form(...),
    password: str = Form(...),
    picture: UploadFile = File(""),
    db:Session = Depends(get_db)):


    username = encrypt(username)
    phone = encrypt(phone)
    email = encrypt(email)
    
    if picture == "":
        picture = f"http:\\\\localhost:8000\\static\\profilePicture\\default.jpg" 
        picture_uuid = "default"
    else:    
        picture_uuid = f"{uuid.uuid4()}"
        picture.filename = f"{picture_uuid}.jpg"

        contents = await picture.read()

        with open(f"static/profilePictures/{picture_uuid}.jpg", "wb") as f:
            f.write(contents)

    password = utils.hash(password)

    user = schemas.UserRegister(username=username,
                                phone=phone,
                                email=email,
                                role = role,
                                password=password,
                                picture=picture_uuid)

    new_user = models.User(**user.dict())

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user



