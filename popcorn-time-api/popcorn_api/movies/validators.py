from datetime import datetime as dt
from datetime import timedelta

from django.forms import ValidationError


def nonsense_year_validator(year: int):
    if year < 1940 or year > (dt.now() + timedelta(days=3650)).year:
        raise ValidationError(
            ("%(value)s is not a correct year!"),
            params={"value": year},
        )
