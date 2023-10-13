from fastapi import APIRouter, Depends, status, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas, oauth2
from typing import List
from ..encryption import encrypt, decrypt

router = APIRouter(prefix="/api/query", tags=["Query"])


@router.get("/name/{name}")
def get_record_by_name(name: str,  current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):

    query_name = name
    print(query_name)

    records = db.query(models.Record).all()

    ID = []

    for record in records:
        name = record.name
        id = record.id
        decrypted_name = decrypt(name.encode())

        if query_name in decrypted_name.lower():
            ID.append(id)

    results = db.query(models.Record).filter(models.Record.id.in_(
        ID)).order_by(models.Record.date_of_assessment.desc()).all()

    if not ID:
        raise HTTPException(status_code=404, detail="Item not found")

    for result in results:
        name = result.name
        result.name = decrypt(name.encode())
        if result.mobile_no != "":
            mobile_no = result.mobile_no
            result.mobile_no = decrypt(mobile_no.encode())
        if result.email != "":
            email = result.email
            result.email = decrypt(email.encode())

    return results


@router.get("/health_record_no/{health_record_no}", response_model=List[schemas.RecordOut])
def get_record_by_health(health_record_no: str,  current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):

    pattern = f'%{health_record_no}%'
    record = db.query(models.Record).filter(models.Record.health_record_no.ilike(
        pattern)).order_by(models.Record.date_of_assessment.desc()).all()
    if not record:
        raise HTTPException(status_code=404, detail="Item not found")

    for result in record:
        name = result.name
        result.name = decrypt(name.encode())
        if result.mobile_no != "":
            mobile_no = result.mobile_no
            result.mobile_no = decrypt(mobile_no.encode())
        if result.email != "":
            email = result.email
            result.email = decrypt(email.encode())
    return record


@router.get("/email/{email}", response_model=List[schemas.RecordOut])
def get_record_by_name(email: str,  current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):

    query_name = email

    records = db.query(models.Record).all()

    ID = []

    for record in records:
        email = record.email
        id = record.id
        decrypted_name = decrypt(email.encode())

        if query_name in decrypted_name.lower():

            ID.append(id)

    if not ID:
        raise HTTPException(status_code=404, detail="Item not found")

    results = db.query(models.Record).filter(models.Record.id.in_(
        ID)).order_by(models.Record.date_of_assessment.desc()).all()

    for result in results:
        name = result.name
        result.name = decrypt(name.encode())
        if result.mobile_no != "":
            mobile_no = result.mobile_no
            result.mobile_no = decrypt(mobile_no.encode())
        if result.email != "":
            email = result.email 
            result.email = decrypt(email.encode())

    return results


@router.get("/mobile_no/{mobile_no}", response_model=List[schemas.RecordOut])
def get_record_by_name(mobile_no: str,  current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):

    query_name = mobile_no

    records = db.query(models.Record).all()

    ID = []

    for record in records:
        mobile_no = record.mobile_no
        id = record.id
        decrypted_name = decrypt(mobile_no.encode())

        if query_name in decrypted_name.lower():

            ID.append(id)

    results = db.query(models.Record).filter(models.Record.id.in_(
        ID)).order_by(models.Record.date_of_assessment.desc()).all()

    if not ID:
        raise HTTPException(status_code=404, detail="Item not found")

    for result in results:
        name = result.name
        result.name = decrypt(name.encode())
        if result.mobile_no != "":
            mobile_no = result.mobile_no
            result.mobile_no = decrypt(mobile_no.encode())
        if result.email != "":
            email = result.email
            result.email = decrypt(email.encode())

    return results


@router.get("/address/{address}", response_model=List[schemas.RecordOut])
def get_record_by_name(address: str,  current_user: int = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):

    query_name = address

    records = db.query(models.Record).all()

    ID = []

    for record in records:
        address = record.address
        id = record.id
        decrypted_name = decrypt(address.encode())
        if query_name in decrypted_name.lower():

            ID.append(id)

    results = db.query(models.Record).filter(models.Record.id.in_(
        ID)).order_by(models.Record.date_of_assessment.desc()).all()

    for result in results:
        name = result.name
        result.name = decrypt(name.encode())
        if result.mobile_no != "":
            mobile_no = record.mobile_no
            result.mobile_no = decrypt(mobile_no.encode())
        if result.email != "":
            email = result.email
            result.email = decrypt(email.encode())

    return results
