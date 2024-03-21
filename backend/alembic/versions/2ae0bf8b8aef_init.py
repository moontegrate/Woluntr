"""init

Revision ID: 2ae0bf8b8aef
Revises: 1b7ba6afbed9
Create Date: 2024-03-19 11:22:13.523230

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2ae0bf8b8aef'
down_revision: Union[str, None] = '1b7ba6afbed9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
