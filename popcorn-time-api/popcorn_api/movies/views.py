from django_filters import rest_framework as filters
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .filters import MovieFilter
from .models import Movie
from .pagination import CustomPagination
from .serializers import MovieSerializer


class ListMovieAPIView(ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = MovieFilter


class RetrieveMovieAPIView(RetrieveAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
