from .models import BirthProfile, MatchHistory


def calculate_match(user, person1_data, person2_data):

    person1 = BirthProfile.objects.create(**person1_data)
    person2 = BirthProfile.objects.create(**person2_data)

    # Simplified Scores

    scores = {
        "varna": 1,
        "vashya": 2,
        "tara": 3,
        "yoni": 4,
        "graha_maitri": 5,
        "gana": 6,
        "bhakoot": 7,
        "nadi": 8,
    }

    total_score = sum(scores.values())

    # Verdict

    if total_score >= 30:
        verdict = "Excellent"

    elif total_score >= 24:
        verdict = "Good"

    elif total_score >= 18:
        verdict = "Average"

    else:
        verdict = "Not Recommended"

    # Saving Match History

    history = MatchHistory.objects.create(

        user=user,

        person1=person1,
        person2=person2,

        varna=scores["varna"],
        vashya=scores["vashya"],
        tara=scores["tara"],
        yoni=scores["yoni"],
        graha_maitri=scores["graha_maitri"],
        gana=scores["gana"],
        bhakoot=scores["bhakoot"],
        nadi=scores["nadi"],

        total_score=total_score,
        verdict=verdict,
    )

    return {

        "match_id": history.id,

        "person1": person1.name,
        "person2": person2.name,

        "varna": history.varna,
        "vashya": history.vashya,
        "tara": history.tara,
        "yoni": history.yoni,
        "graha_maitri": history.graha_maitri,
        "gana": history.gana,
        "bhakoot": history.bhakoot,
        "nadi": history.nadi,

        "total_score": history.total_score,
        "verdict": history.verdict,
    }
