from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from .services import calculate_match
from .models import MatchHistory
from django.shortcuts import get_object_or_404


class MatchView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = MatchRequestSerializer(data=request.data)

        if serializer.is_valid():

            result = calculate_match(
                user=request.user,
                person1_data=serializer.validated_data["person1"],
                person2_data=serializer.validated_data["person2"]
            )

            return Response(
                result,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class MatchResultView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, id):

        match = get_object_or_404(
            MatchHistory,
            id=id,
            user=request.user
        )

        return Response({
            "match_id": match.id,

            "person1": match.person1.name,
            "person2": match.person2.name,

            "varna": match.varna,
            "vashya": match.vashya,
            "tara": match.tara,
            "yoni": match.yoni,
            "graha_maitri": match.graha_maitri,
            "gana": match.gana,
            "bhakoot": match.bhakoot,
            "nadi": match.nadi,

            "total_score": match.total_score,
            "verdict": match.verdict,
        })
