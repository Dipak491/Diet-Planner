from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


def calculate_bmi(weight, height):
    bmi = weight / ((height / 100) ** 2)
    if bmi < 18.5:
        category = "Underweight"
    elif bmi < 25:
        category = "Normal"
    elif bmi < 30:
        category = "Overweight"
    else:
        category = "Obese"
    return round(bmi, 2), category


# ----------------- Diet Logic -----------------


def diet_plan(bmi, diet_type):
    if bmi < 18.5:
        return {
            "goal": "Weight Gain",
            "diet": ["Milk", "Banana", "Rice", "Paneer" if diet_type == 'veg' else "Eggs"],
            "protein": "High",
            "carbs": "High",
            "fats": "Medium"
        }
    elif bmi < 25:
        return {
            "goal": "Maintain Fitness",
            "diet": ["Vegetables", "Fruits", "Dal" if diet_type == 'veg' else "Chicken"],
            "protein": "Medium",
            "carbs": "Medium",
            "fats": "Low"
        }
    else:
        return {
            "goal": "Weight Loss",
            "diet": ["Salad", "Soup", "Oats"],
            "protein": "High",
            "carbs": "Low",
            "fats": "Low"
        }


# ----------------- API -----------------


@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    bmi, category = calculate_bmi(float(data['weight']), float(data['height']))
    plan = diet_plan(bmi, data['dietType'])

    response = {
        "bmi": bmi,
        "category": category,
        "dietPlan": plan,
        "water": f"{float(data['weight']) * 0.033:.1f} Liters/day",
        "exercise": "Walking, Yoga" if bmi < 25 else "Cardio, HIIT",
        "motivation": "Stay consistent! Small progress is still progress 💪"
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)