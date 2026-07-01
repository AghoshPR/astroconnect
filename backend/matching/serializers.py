from rest_framework import serializers


class BirthProfileSerializer(serializers.Serializer):

    name = serializers.CharField(max_length=100)
    date_of_birth = serializers.DateField()
    birth_time = serializers.TimeField()
    place_of_birth = serializers.CharField(max_length=255)
    latitude = serializers.DecimalField(max_digits=9, decimal_places=6)
    longitude = serializers.DecimalField(max_digits=9, decimal_places=6)


class MatchRequestSerializer(serializers.Serializer):

    person1 = BirthProfileSerializer()
    person2 = BirthProfileSerializer()
