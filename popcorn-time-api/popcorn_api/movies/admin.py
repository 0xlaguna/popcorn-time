from django.contrib import admin

from .models import Movie
from .models import Rating


class MovieAdmin(admin.ModelAdmin):
    list_display = ("title", "year", "genre")

class MovieComment(admin.ModelAdmin):
    list_display = ("user", "movie", "rating", "comment")


admin.site.register(Movie, MovieAdmin)
admin.site.register(Rating, MovieComment)