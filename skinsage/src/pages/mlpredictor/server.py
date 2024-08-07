from flask import Flask, request, jsonify
import joblib
module_clf = joblib.load('custom_model.pkl')
module_prediction = module_clf.predict("a.png")
print(module_prediction)
