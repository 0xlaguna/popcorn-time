from django_filters import rest_framework as filters
from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .filters import MovieFilter
from .models import Movie, Rating
from .pagination import CustomPagination
from .serializers import MovieSerializer, RatingSerializer


class ListMovieAPIView(ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = MovieFilter


class RetrieveMovieAPIView(RetrieveAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()


class ListMovieRatingsAPIView(ListAPIView):
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = CustomPagination

    def get_queryset(self):
        movie_id = self.request.query_params.get('movie_id')
        return Rating.objects.filter(movie=movie_id).all()
