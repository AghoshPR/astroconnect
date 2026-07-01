from .models import BirthProfile, MatchHistory
import random


def calculate_match(user, person1_data, person2_data):
    try:
        person1 = BirthProfile.objects.create(**person1_data)
        person2 = BirthProfile.objects.create(**person2_data)

        # Simplified Scores

        scores = {
            "varna": random.randint(0, 1),
            "vashya": random.randint(0, 2),
            "tara": random.randint(0, 3),
            "yoni": random.randint(0, 4),
            "graha_maitri": random.randint(0, 5),
            "gana": random.randint(0, 6),
            "bhakoot": random.randint(0, 7),
            "nadi": random.randint(0, 8),
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
    except Exception as e:
        raise Exception(f"Error calculating match: {str(e)}")
