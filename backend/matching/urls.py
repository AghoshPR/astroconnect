from django.urls import path
from .views import MatchView, MatchResultView

urlpatterns = [
    path("match/", MatchView.as_view(), name="match"),
    path("history/<int:id>/", MatchResultView.as_view(), name="match-result"),
]