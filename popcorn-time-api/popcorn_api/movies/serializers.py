from rest_framework import serializers

from .models import Movie, Rating, Watchlist

class RatingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    class Meta:
        model = Rating
        fields = (
            "id",
            "rating",
            "comment",
            "username",
            "posted_at"
        )

class MovieSerializer(serializers.ModelSerializer):
    ratings = RatingSerializer(many=True, read_only=True)
    class Meta:
        model = Movie
        fields = (
            "id",
            "title",
            "year",
            "runtime",
            "released",
            "genre",
            "cover",
            "plot",
            "ratings"
        )

class WatchlistSerializer(serializers.ModelSerializer):
    movie_title = serializers.CharField(source="movie.title")
    movie_cover = serializers.CharField(source="movie.cover")

    class Meta:
        model = Watchlist
        fields = (
            "id",
            "movie_title",
            "movie_cover"
        )


class CreateWatchlistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Watchlist
        fields = (
            "id",
            "movie"
        )