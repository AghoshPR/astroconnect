from django.db import models
from django.contrib.auth.models import User


class BirthProfile(models.Model):

    name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    birth_time = models.TimeField()
    place_of_birth = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class MatchHistory(models.Model):

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="match_history")
    person1 = models.ForeignKey(
        BirthProfile, on_delete=models.CASCADE, related_name="person1_matches")
    person2 = models.ForeignKey(
        BirthProfile, on_delete=models.CASCADE, related_name="person2_matches")
    varna = models.IntegerField()
    vashya = models.IntegerField()
    tara = models.IntegerField()
    yoni = models.IntegerField()
    graha_maitri = models.IntegerField()
    gana = models.IntegerField()
    bhakoot = models.IntegerField()
    nadi = models.IntegerField()
    total_score = models.IntegerField()
    verdict = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.person1.name} & {self.person2.name}"
