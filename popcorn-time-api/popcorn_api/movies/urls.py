from django.urls import path

from . import views

urlpatterns = [
    path("movies", views.ListMovieAPIView.as_view(), name="get_movies"),
    path(
        "movies/<int:pk>/",
        views.RetrieveMovieAPIView.as_view(),
        name="get_movie",
    ),
    path("ratings", views.ListMovieRatingsAPIView.as_view(), name="get_ratings"),
]
