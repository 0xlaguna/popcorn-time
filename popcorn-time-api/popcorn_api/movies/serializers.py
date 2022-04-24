from rest_framework import serializers

from .models import Movie
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = (
            "id",
            "user",
            "movie",
            "rating",
            "comment"
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
