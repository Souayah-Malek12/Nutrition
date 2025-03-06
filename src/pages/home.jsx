import React from "react";
import FoodSearchPage from "./RechercheAliment";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen p-6">
      {/* Welcome Section */}
      <div className="animate-fade-in text-center">
        <h1 className="text-4xl font-bold mb-2 text-blue-900">
          Welcome to Your Health Tracker
        </h1>
        <p className="text-gray-700">
          Use our tools to calculate your Body Mass Index (BMI) and track the
          calories in your meals for a healthier lifestyle.
        </p>
      </div>


      {/* Brief Explanation */}
      <div className="text-center animate-fade-in mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">
          Why Use Our Site?
        </h2>
        <p className="text-gray-700">
          - Calculate your Body Mass Index (BMI) to monitor your weight health.
        </p>
        <p className="text-gray-700">
          - Track your food calories to stay on top of your nutrition and make
          healthier food choices.
        </p>
      </div>

      {/* Nutrition Tips Section */}
      <div className="mt-12 animate-fade-in">
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-900">
          Nutrition Tips for a Healthy Lifestyle
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Eat More Fruits & Veggies",
              image: "https://www.healthyfood.com/wp-content/uploads/2021/08/50-easy-ways-to-eat-more-fruit-and-veg-iStock-1225383160.jpg",
              text: "Fruits and vegetables are packed with essential vitamins and minerals that help boost immunity and overall health. Aim for a colorful plate at each meal!",
            },
            {
              title: "Balance Your Meals",
              image: "https://www.alimentarium.org/sites/default/files/media/image/2017-04/EMAG_balanced_meal_shutterstock_54369673_TOP_0_0.jpg",
              text: "A healthy meal should include a balance of proteins, healthy fats, and complex carbohydrates. This will keep your energy levels steady throughout the day.",
            },
            {
              title: "Stay Hydrated",
              image: "data:image/jpeg;base64,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",
              text: "Drinking water is crucial for your body to function properly. It aids in digestion, circulation, and temperature regulation. Aim for 8 glasses a day!",
            },
            {
              title: "Exercise Regularly",
              image: "https://domf5oio6qrcr.cloudfront.net/medialibrary/2293/l0908b16207233934035.jpg",
              text: "Pair your healthy eating habits with regular physical activity. Even a brisk walk each day can improve your health and help maintain a healthy weight.",
            },
            {
              title: "Get Enough Sleep",
              image: "https://thehealthcareinsights.com/wp-content/uploads/2021/10/Get-Enough-Sleep.jpg",
              text: "Sleep is essential for recovery and overall well-being. Aim for 7-9 hours of quality sleep each night to allow your body to repair and recharge.",
            },
            {
              title: "Practice Mindfulness",
              image: "https://d2tdui6flib2aa.cloudfront.net/new-harbinger-wp/wp-content/uploads/2020/10/29101226/groupmeditating.jpg",
              text: "Managing stress is key to maintaining a healthy diet and lifestyle. Try mindfulness practices like meditation or deep breathing to help reduce stress.",
            },
          ].map((tip, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg mb-2 text-blue-900">
                {tip.title}
              </h3>
              <p className="text-gray-700">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
