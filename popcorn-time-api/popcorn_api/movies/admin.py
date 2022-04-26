from django.contrib import admin

from .models import Movie, Rating, Watchlist


class MovieAdmin(admin.ModelAdmin):
    list_display = ("title", "year", "genre")

class MovieComment(admin.ModelAdmin):
    list_display = ("user", "movie", "rating", "comment")

class WatchlistAdmin(admin.ModelAdmin):
    list_display = ("user", "movie", "created_at")


admin.site.register(Movie, MovieAdmin)
admin.site.register(Rating, MovieComment)
admin.site.register(Watchlist, WatchlistAdmin)