from django_filters import rest_framework as filters
from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView

from .filters import MovieFilter
from .models import Movie, Rating, Watchlist
from .pagination import CustomPagination

# isort: off
from .serializers import (
    MovieSerializer, 
    RatingSerializer, 
    WatchlistSerializer, 
    CreateWatchlistSerializer
)


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


class CreateMovieAPIView(CreateAPIView):
    serializer_class = MovieSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Movie.objects.all()


# WATCHLIST

class ListUserWatchlistAPIView(ListAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = CustomPagination

    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user).all()

class CreateWatchlistAPIView(CreateAPIView):
    serializer_class = CreateWatchlistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
