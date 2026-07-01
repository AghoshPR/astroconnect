from django.urls import path
from .views import *

urlpatterns = [
    path("match/", MatchView.as_view(), name="match"),
    path("history/", HistoryListView.as_view(), name="history-list"),
    path("history/<int:id>/", MatchResultView.as_view(), name="match-result"),
]