from django.conf import settings
from django.core.validators import MaxValueValidator
from django.db import models

from .validators import nonsense_year_validator


class Movie(models.Model):
    title = models.CharField(max_length=60)
    year = models.SmallIntegerField(validators=[nonsense_year_validator])
    runtime = models.TimeField()
    released = models.DateField(null=True)
    genre = models.TextField()
    cover = models.TextField(null=True)
    plot = models.TextField(null=True)

    class Meta:
        db_table = "movie"

    def _str_(self):
        return self.title


class rating(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(
        validators=[MaxValueValidator(10)]
    )
    comment = models.TextField(null=True)

    class Meta:
        db_table = "rating"
