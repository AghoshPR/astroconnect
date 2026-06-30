from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model=User
        fields=[
            "username",
            "email",
            "password",
            "confirm_password"
        ]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self,attrs):

        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError({
                "username": "Username already exists."
            })
        
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({
                "email":"Email already exists."
            })
        
        return attrs
    
    def create(self,validated_data):

        validated_data.pop("confirm_password")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        return user
    

class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self,attrs):

        username = attrs.get("username")
        password = attrs.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if not user:
            raise serializers.ValidationError({
                "error":"Invalid username or password"
            })
        
        attrs["user"]=user

        return attrs
