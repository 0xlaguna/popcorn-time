from django_filters import rest_framework as filters

from .models import Movie


class MovieFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr="icontains")
    genre = filters.CharFilter(lookup_expr="icontains")
    year = filters.NumberFilter()

    class Meta:
        model = Movie
        fields = ["title", "genre", "year"]
