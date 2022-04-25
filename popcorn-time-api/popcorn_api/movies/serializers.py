from rest_framework import serializers

from .models import Movie
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
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
