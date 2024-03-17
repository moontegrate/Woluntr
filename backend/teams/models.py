from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from backend.database import Base

class Team(Base):
    __tablename__ = 'teams'

    id = Column(Integer, primary_key=True, index=True)
    leader_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String)
    description = Column(String)
    time_create = Column(String)
    opened = Column(Boolean)

    leader = relationship("User", back_populates="teams")
    invites = relationship("TeamInvite", back_populates="team")

class TeamInvite(Base):
    __tablename__ = 'team_invites'

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey('teams.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    status = Column(Boolean, nullable=True)

    team = relationship("Team", back_populates="invites")
    user = relationship("User")
