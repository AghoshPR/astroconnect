from decouple import config
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from .serializers import RegisterSerializer, LoginSerializer


class RegisterView(APIView):

    def post(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()

                return Response(
                    {"message": "User registered successfully."},
                    status=status.HTTP_201_CREATED,
                )

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class LoginView(APIView):

    def post(self, request):
        try:
            serializer = LoginSerializer(data=request.data)

            if serializer.is_valid():

                user = serializer.validated_data["user"]

                refresh = RefreshToken.for_user(user)
                access = refresh.access_token

                response = Response(
                    {
                        "message": "Login successful.",
                        "access": str(access),
                    },
                    status=status.HTTP_200_OK,
                )

                response.set_cookie(
                    key="refresh_token",
                    value=str(refresh),
                    httponly=True,
                    secure=config("COOKIE_SECURE", cast=bool),
                    samesite=config("COOKIE_SAMESITE"),
                    max_age=60 * 60 * 24 * 7,  # 7 days
                )

                return response

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class RefreshTokenView(APIView):

    def post(self, request):

        try:
            refresh_token = request.COOKIES.get("refresh_token")

            if not refresh_token:
                return Response(
                    {"error": "Refresh token not found."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            refresh = RefreshToken(refresh_token)
            access = refresh.access_token

            return Response(
                {
                    "message": "Token refreshed successfully.",
                    "access": str(access),
                },
                status=status.HTTP_200_OK,
            )

        except TokenError:
            return Response(
                {"error": "Invalid or expired refresh token."},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class LogoutView(APIView):

    def post(self, request):

        try:
            refresh_token = request.COOKIES.get("refresh_token")

            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()

            response = Response(
                {"message": "Logged out successfully."},
                status=status.HTTP_200_OK,
            )

            response.delete_cookie("refresh_token")

            return response

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
