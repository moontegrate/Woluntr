from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base

association_table = Table('user_skills', Base.metadata,
                          Column('user_id', Integer, ForeignKey('users.id')),
                          Column('skill_id', Integer, ForeignKey('skills.id'))
                         )

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    avatar = Column(String)  # File path or reference
    company = Column(String)
    rating_volunteer = Column(Integer)
    rating_customer = Column(Integer)

    skills = relationship("Skill", secondary=association_table, backref="users")
    teams = relationship("Team", back_populates="leader")

class Skill(Base):
    __tablename__ = 'skills'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
